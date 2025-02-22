import React from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import "./HomePage.css";
import RoomsLayout from "../../layouts/HotelLayout/RoomsLayout";
import AppFooter from "../../components/AppFooter/AppFooter.";

function HomePage() {
    return (
        <section clasName="home-page">
            <NavigationBar/>
            <RoomsLayout/>
            <AppFooter />
        </section>
    );
}   

export default HomePage;