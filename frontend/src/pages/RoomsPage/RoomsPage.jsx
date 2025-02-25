import React from "react";
import "./RoomsPage.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import RoomsLayout from "../../layouts/RoomsLayout/RoomsLayout";
import { FaSearch } from "react-icons/fa"
import AppFooter from "../../components/AppFooter/AppFooter.";
function RoomsPage() {

    return (
        <section className="rooms-page">
            <NavigationBar />
            <h1 className="rooms-page-title">Todas nuestras habitaciones</h1>
            <div className="rooms-page-filter-container">
                <div className="rooms-page-filter-search">
                    <input className="rooms-page-filter-search-input" type="text" placeholder="Realiza tus busquedas aquí"></input>
                    <button className="rooms-page-filter-search-button"><FaSearch /></button>
                </div>
                <div className="rooms-page-filter-category">
                    <p className="rooms-page-filter-category-title">Seleccionar categoría</p>
                    <button className="rooms-page-filter-category-option">Normal</button>
                    <button className="rooms-page-filter-category-option">Ejectutivo</button>
                    <button className="rooms-page-filter-category-option">Familiar</button>
                    <button className="rooms-page-filter-category-option">De lujo</button>
                </div>
            </div>
            <RoomsLayout />
            <AppFooter />
        </section>
    );
}

export default RoomsPage;