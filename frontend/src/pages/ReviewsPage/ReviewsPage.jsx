import React from "react";
import "./ReviewsPage.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import ReviewsLayout from "../../layouts/ReviewsLayout/ReviewsLayout";
import AppFooter from "../../components/AppFooter/AppFooter";

function ReviewsPage(){
    return(
        <section className="reviews-page">
            <NavigationBar />
            <h1 className="reviews-page-title">Reseñas generales de Usuarios</h1>
            <ReviewsLayout />
            <AppFooter />
        </section>
    );
}

export default ReviewsPage;