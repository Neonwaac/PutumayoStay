const Blockchain = require('../models/blockchain');

exports.appendBlock = async (req, res) => {
  try {
    const { data, id_reserva, id_pago, creator_id } = req.body;
    const block = await Blockchain.createBlock({ data, id_reserva, id_pago, creator_id });
    res.status(201).json({ message: 'Block appended', block });
  } catch (error) {
    console.error('Error appending block:', error);
    res.status(500).json({ error: 'Could not append block' });
  }
};

exports.listBlocks = async (req, res) => {
  try {
    const limit = req.query.limit || 100;
    const rows = await Blockchain.list(limit);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error listing blocks:', error);
    res.status(500).json({ error: 'Could not list blocks' });
  }
};
