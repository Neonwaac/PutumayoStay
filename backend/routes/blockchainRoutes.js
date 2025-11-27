const express = require('express');
const router = express.Router();
const blockchainController = require('../controllers/blockchainController');

router.post('/blockchain/append', blockchainController.appendBlock);
router.get('/blockchain', blockchainController.listBlocks);

module.exports = router;
