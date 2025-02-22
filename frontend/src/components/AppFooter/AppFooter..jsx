import React from "react";
import './AppFooter.css';
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
                    <p className="app-footer-item"> • Sobre Nosotros</p>
                    <p className="app-footer-item"> • Trabaja con nosotros</p>
                    <p className="app-footer-item"> • Soporte</p>
                </div>
                <div className="app-footer-right-social">
                    <p className="app-footer-item">Redes Sociales</p>
                    <p className="app-footer-item"> • <FaYoutube className ="app-footer-youtube-icon"/>&nbsp;Youtube</p>
                    <p className="app-footer-item"> • <FaInstagram className ="app-footer-instagram-icon"/>&nbsp;Instagram</p>
                </div>
            </div>
            <p className="app-footer-creators">Creado por Neonwaac & SdeathTK</p>
        </section>
    )
}

export default AppFooter;