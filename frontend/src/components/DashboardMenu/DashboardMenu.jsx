import React from "react";
import { FaChartBar, FaUser, FaBell, FaArrowAltCircleLeft, FaCalendarCheck, FaHistory, FaCreditCard} from "react-icons/fa"; 
import "./DashboardMenu.css";

function DashboardMenu() {
  return (
    <section className="dashboard-menu">
        <div className="dashboard-menu-top">
            <h1 className="dashboard-menu-title">Menú de Usuario</h1>
        </div>
        <nav className="dashboard-menu-mid">
            <div className="dashboard-menu-option">
                <FaUser className="dashboard-menu-option-icon"/>
                Mi Perfil
            </div>
            <div className="dashboard-menu-option">
                <FaCalendarCheck className="dashboard-menu-option-icon"/>
                Mis Reservas
            </div>
            <div className="dashboard-menu-option">
                <FaHistory lassName="dashboard-menu-option-icon"/>
                Historial de Reservas
            </div>
            <div className="dashboard-menu-option">
                <FaCreditCard lassName="dashboard-menu-option-icon"/>
                Historial de Pagos
            </div>
            <div className="dashboard-menu-option">
                <FaBell lassName="dashboard-menu-option-icon"/>
                Notificaciones
            </div>
            <div className="dashboard-menu-option-close-session">
                <FaArrowAltCircleLeft className="dashboard-menu-option-icon"/>
                Cerrar Sesión
            </div>
        </nav>
        <div className="dashboard-menu-bot">
            <p className="dashboard-menu-version">PUTUMAYO STAY V1.3</p>
        </div>
    </section>
  );
}

export default DashboardMenu;
