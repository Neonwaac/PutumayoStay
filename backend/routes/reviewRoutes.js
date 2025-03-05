const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController.js');

router.get("/reviews", reviewController.ObtenerReviews);

module.exports = router;