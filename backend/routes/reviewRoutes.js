const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController.js');

router.get("/reviews", reviewController.ObtenerReviews);
router.get("/reviews/room/:id", reviewController.ObtenerReviewsPorHabitacion)
router.post("/reviews", reviewController.CrearReview)
router.delete("/reviews/:id", reviewController.EliminarReview)
module.exports = router;