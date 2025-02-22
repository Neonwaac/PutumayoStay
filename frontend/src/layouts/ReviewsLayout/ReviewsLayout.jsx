import React from "react";
import './ReviewsLayout.css';
import ReviewCard from "../../components/ReviewCard/ReviewCard";

function ReviewsLayout(){
    return(
        <section className="reviews-layout">
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />

        </section>
    )
}

export default ReviewsLayout;