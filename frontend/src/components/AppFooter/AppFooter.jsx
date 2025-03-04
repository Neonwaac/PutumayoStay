import React from "react";
import './AppFooter.css';
import { Link } from "react-router-dom";
import { FaYoutube, FaInstagram } from "react-icons/fa";
import companyLogo from '../../assets/larger-light-logo.png';
function AppFooter(){
    return (
        <section className="app-footer">
            <div className="app-footer-left">
                <img src={companyLogo} className="app-footer-logo" alt="Logo" />
            </div>
            <div className="app-footer-right">
                <div className="app-footer-right-career">
                    <Link to="/about" className="app-footer-item"> • Sobre Nosotros</Link>
                    <Link to="*"className="app-footer-item"> • Trabaja con nosotros</Link>
                    <Link to="support" className="app-footer-item"> • Soporte</Link>
                </div>
                <div className="app-footer-right-social">
                    <p className="app-footer-item">Redes Sociales</p>
                    <a className="app-footer-item" href="https://www.youtube.com/@NEONWAAC" target="_blank">• <FaYoutube />&nbsp; Youtube</a>
                    <a className="app-footer-item" href="https://www.instagram.com/neonwaac.astro/" target="_blank">• <FaInstagram />&nbsp; Instagram</a>
                </div>
            </div>
            <p className="app-footer-creators">Creado por Neonwaac & SdeathTK</p>
        </section>
    )
}

export default AppFooter;