const db = require('../db/db');
const crypto = require('crypto');

class Blockchain {
  static async getLastBlock() {
    try {
      const query = `SELECT * FROM blockchain ORDER BY id DESC LIMIT 1`;
      const [rows] = await db.promise().execute(query);
      return rows && rows.length ? rows[0] : null;
    } catch (error) {
      // If table doesn't exist, return null (genesis block)
      if (error.code === 'ER_NO_SUCH_TABLE') {
        return null;
      }
      throw error;
    }
  }

  static calculateHash(previousHash, timestamp, data, nonce) {
    return crypto
      .createHash('sha256')
      .update(previousHash + timestamp + data + nonce)
      .digest('hex');
  }

  static async mineBlock(previousHash, data, difficulty = 2) {
    let nonce = 0;
    const target = '0'.repeat(difficulty);
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let hash = '';
    while (true) {
      hash = Blockchain.calculateHash(previousHash || '0', timestamp, data, nonce);
      if (hash.substring(0, difficulty) === target) {
        return { nonce, hash, timestamp };
      }
      nonce++;
    }
  }

  static async createBlock({ data = '', id_reserva = null, id_pago = null, creator_id = null } = {}) {
    try {
      // Ensure table exists first
      await Blockchain.ensureTableExists();
      const last = await Blockchain.getLastBlock();
      const previous_hash = last ? last.hash : '0';
      const payload = typeof data === 'string' ? data : JSON.stringify(data);
      const difficulty = 2; // small difficulty to avoid heavy CPU usage
      const { nonce, hash, timestamp } = await Blockchain.mineBlock(previous_hash, payload, difficulty);

      const query = `INSERT INTO blockchain (timestamp, data, hash, previous_hash, nonce, id_reserva, id_pago, creator_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      const [result] = await db.promise().execute(query, [timestamp, payload, hash, previous_hash, nonce, id_reserva, id_pago, creator_id]);
      return { id: result.insertId, hash, previous_hash, timestamp, nonce };
    } catch (error) {
      throw error;
    }
  }

  static async list(limit = 100, startDate = null, endDate = null) {
    // Ensure table exists first
    await Blockchain.ensureTableExists();
    let query = `SELECT * FROM blockchain`;
    const params = [];
    const conditions = [];

    if (startDate && typeof startDate === 'string' && startDate.trim() !== '') {
        conditions.push(`timestamp >= ?`);
        params.push(startDate + ' 00:00:00');
    }
    if (endDate && typeof endDate === 'string' && endDate.trim() !== '') {
        conditions.push(`timestamp <= ?`);
        params.push(endDate + ' 23:59:59');
    }

    if (conditions.length > 0) {
        query += ` WHERE ` + conditions.join(' AND ');
    }

    query += ` ORDER BY id DESC LIMIT ?`;
    
    let parsedLimit = parseInt(limit, 10);
    if (isNaN(parsedLimit) || parsedLimit <= 0) {
        parsedLimit = 100;
    }
    params.push(parsedLimit);

    // Use query instead of execute for dynamic queries to avoid prepared statement issues with varying parameters
    const [rows] = await db.promise().query(query, params);
    return rows;
  }

  static async ensureTableExists() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS blockchain (
        id int(11) NOT NULL AUTO_INCREMENT,
        timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        data text NOT NULL,
        hash varchar(128) NOT NULL,
        previous_hash varchar(128) NOT NULL,
        nonce int(11) NOT NULL,
        id_reserva int(11) DEFAULT NULL,
        id_pago int(11) DEFAULT NULL,
        creator_id int(11) DEFAULT NULL,
        PRIMARY KEY (id),
        KEY id_reserva (id_reserva),
        KEY id_pago (id_pago),
        KEY creator_id (creator_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
    `;
    await db.promise().execute(createTableQuery);
  }
}

module.exports = Blockchain;
