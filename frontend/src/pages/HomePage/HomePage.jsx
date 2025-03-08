import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import "./HomePage.css";
import RoomsLayout from "../../layouts/RoomsLayout/RoomsLayout";
import AppFooter from "../../components/AppFooter/AppFooter";
import ReviewsLayout from "../../layouts/ReviewsLayout/ReviewsLayout";
import { useNavigate } from "react-router-dom";

function HomePage() {

    const [maxRoomCards, setMaxRoomCards] = useState(3);
    useEffect(() => {
        const updateMaxRoomCards = () => {
            const width = window.innerWidth;

            if (width >= 1820) {
                setMaxRoomCards(4);
            } else if (width >= 1280) {
                setMaxRoomCards(3);
            } else if (width >= 768) {
                setMaxRoomCards(2);
            } else {
                setMaxRoomCards(2);
            }
        }
        updateMaxRoomCards();
    });

    const navigate = useNavigate();
    const goRoomsPage = (e) => {
        e.preventDefault();
        navigate("/rooms")
    }
    const goReviewsPage = (e) => {
        e.preventDefault();
        navigate("/reviews")
    }
    return (
        <section clasName="home-page">
            <NavigationBar/>
            <div className="rooms-layout-view-all-container">
                <h1 className="rooms-layout-title">Habitaciones Disponibles</h1>
                <button className="rooms-layout-view-all-button" onClick={goRoomsPage}>Ver todas las habitaciones</button>
            </div>
            <RoomsLayout maxRoomCards={maxRoomCards}/>
            <div className="reviews-layout-view-all-container">
                <h1 className="reviews-layout-title">Reseñas de Usuarios</h1>
                <button className="reviews-layout-view-all-button" onClick={goReviewsPage}>Ver más reseñas de usuarios</button>
            </div>
            <ReviewsLayout maxReviewCards={2}/>
            <AppFooter />
        </section>
    );
}   

export default HomePage;