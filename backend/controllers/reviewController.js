const Review = require('../models/review.js');

exports.ObtenerReviews = async(req, res) => {
    try{
        const reviews = await Review.ObtenerReviews();
        res.status(200).json(reviews);
    }catch(error){
        res.status(500).json('Error al obtener las reviews')
    }
}