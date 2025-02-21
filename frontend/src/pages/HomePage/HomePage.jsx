import React from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import "./HomePage.css";
import RoomsLayout from "../../layouts/HotelLayout/RoomsLayout";
function HomePage() {
    return (
        <section clasName="home-page">
            <NavigationBar/>
            <RoomsLayout/>
        </section>
    );
}   

export default HomePage;