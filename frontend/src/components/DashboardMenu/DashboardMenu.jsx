import React, {useState, useEffect} from "react";
import { FaChartBar, FaUser, FaBell, FaArrowAltCircleLeft, FaCalendarCheck, FaHistory, FaCreditCard} from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./DashboardMenu.css";

function DashboardMenu() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    useEffect(()=>{
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          setUser(storedUser);
        } else {
          navigate("/login");
        }
      }, [navigate]);
    const cerrarSesion = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Estas seguro de cerrar sesión?",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar"
            }).then((result) => {
            if (result.isConfirmed) {
                 Swal.fire({
                 title: "Hasta pronto!!...",
                 text: "Has cerrado sesión.",
                 icon: "success"
                 });
                }
                localStorage.removeItem('user')
                window.location.reload(true)
            })
    }
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
                <FaHistory className="dashboard-menu-option-icon"/>
                Historial de Reservas
            </div>
            <div className="dashboard-menu-option">
                <FaCreditCard className="dashboard-menu-option-icon"/>
                Historial de Pagos
            </div>
            <div className="dashboard-menu-option">
                <FaBell className="dashboard-menu-option-icon"/>
                Notificaciones
            </div>
            <div className="dashboard-menu-option-close-session" onClick={cerrarSesion}>
                <FaArrowAltCircleLeft className="dashboard-menu-option-icon-close-session"/>
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
