import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import "./HomePage.css";
import RoomsLayout from "../../layouts/RoomsLayout/RoomsLayout";
import AppFooter from "../../components/AppFooter/AppFooter";
import ReviewsLayout from "../../layouts/ReviewsLayout/ReviewsLayout";
import { useNavigate } from "react-router-dom";
import SpecialRecognition from "../../layouts/SpecialRecognition/SpecialRecognition";
import HomePageBg from "../../assets/home-page-bg.jpg";
import AdminPanel from "../../components/AdminPanel/AdminPanel";
import axios from "axios";

function HomePage() {
    const [user, setUser] = useState(null);
    const [maxRoomCards, setMaxRoomCards] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get(`https://localhost:8077/usuarios/token/${token}`);
                    setUser(response.data);
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            }
        };
        fetchUser();
    }, []);

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

    const goRoomsPage = (e) => {
        e.preventDefault();
        navigate("/rooms")
    }
    const goReviewsPage = (e) => {
        e.preventDefault();
        navigate("/reviews")
    }

    if (user && user.rol === 2) {
        return (
            <section className="home-page">
                <NavigationBar />
                <AdminPanel />
                <AppFooter />
            </section>
        );
    }

    return (
        <section className="home-page">
            <NavigationBar/>
            <img className="home-page-bg"src={HomePageBg}/>
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
            <SpecialRecognition />
            <AppFooter />
        </section>
    );
}   

export default HomePage;