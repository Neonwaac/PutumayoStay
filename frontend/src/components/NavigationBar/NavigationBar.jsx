import React from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";
import companyLogo from "../../assets/larger-light-logo.png";
function NavigationBar() {
    return (
        <section className="navigation-bar">
            <div className="navigation-bar-left">
                <img src={companyLogo} alt="Company Logo" className="navigation-bar-logo" />
            </div>
            <div className="navigation-bar-right">
                <div className="navigation-bar-link-container">
                    <Link className="navigation-bar-link" to="/">Home</Link>
                </div>
                <div className="navigation-bar-link-container">
                    <Link className="navigation-bar-link" to="/rooms">Habitaciones</Link>
                </div>
                <div className="navigation-bar-link-container">
                    <Link className="navigation-bar-link" to="/reviews">Reseñas</Link>
                </div>
                <div className="navigation-bar-link-container">
                    <Link className="navigation-bar-link" to="/dashboard">Cuenta</Link>
                </div>
            </div>
        </section>
    );
}
export default NavigationBar;