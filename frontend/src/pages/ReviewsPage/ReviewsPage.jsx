import React from "react";
import "./ReviewsPage.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import ReviewsLayout from "../../layouts/ReviewsLayout/ReviewsLayout";

function ReviewsPage(){
    return(
        <section className="reviews-page">
            <NavigationBar />
            <ReviewsLayout />
        </section>
    );
}

export default ReviewsPage;