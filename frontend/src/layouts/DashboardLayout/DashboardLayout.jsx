import "./DashboardLayout.css";
import "../../components/DashboardMenu/DashboardMenu.css";
import React, {useState, useEffect} from "react";
import { FaUser, FaBell, FaArrowAltCircleLeft, FaCalendarCheck, FaHistory, FaCreditCard} from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ProfileLayout from "../ProfileLayout/ProfileLayout";
import BookingsLayout from "../BookingsLayout/BookingsLayout";
import BookingHistoryLayout from "../BookingHistoryLayout/BookingHistoryLayout";
import PaymentsLayout from "../PaymentsLayout/PaymentsLayout";
import NotificationsLayout from "../NotificationsLayout/NotificationsLayout";

function DashboardLayout() {
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

    const [vista, setVista] = useState("ProfileLayout");
    const renderVista = () => {
      switch (vista){
        case "ProfileLayout":
          return <ProfileLayout />;
        case "BookingsLayout":
          return <BookingsLayout />;
        case "BookingHistoryLayout":
          return <BookingHistoryLayout />;
        case "PaymentsLayout":
          return <PaymentsLayout />;
        case "NotificationsLayout":
          return <NotificationsLayout />;
        default:
          return <ProfileLayout />;
      }
    }
  return (
    <section className="dashboard-layout">
      <section className="dashboard-menu">
        <div className="dashboard-menu-top">
          <h1 className="dashboard-menu-title">Menú de Usuario</h1>
        </div>
        <nav className="dashboard-menu-mid">
          <div className="dashboard-menu-option" onClick={() => setVista("ProfileLayout")}>
            <FaUser className="dashboard-menu-option-icon" />
            Mi Perfil
            
          </div>
          <div className="dashboard-menu-option" onClick={() => setVista("BookingsLayout")}>
            <FaCalendarCheck className="dashboard-menu-option-icon" />
            Mis Reservas
            
          </div>
          <div className="dashboard-menu-option" onClick={() => setVista("BookingHistoryLayout")}>
            <FaHistory className="dashboard-menu-option-icon" />
            Historial de Reservas
            
          </div>
          <div className="dashboard-menu-option" onClick={() => setVista("PaymentsLayout")}>
            <FaCreditCard className="dashboard-menu-option-icon" />
            Historial de Pagos
            
          </div>
          <div className="dashboard-menu-option" onClick={() => setVista("NotificationsLayout")}>
            <FaBell className="dashboard-menu-option-icon" />
            
            Notificaciones
          </div>
          <div
            className="dashboard-menu-option-close-session"
            onClick={cerrarSesion}
          >
            <FaArrowAltCircleLeft className="dashboard-menu-option-icon-close-session" />
            Cerrar Sesión
          </div>
        </nav>
        <div className="dashboard-menu-bot">
          <p className="dashboard-menu-version">PUTUMAYO STAY V1.3</p>
        </div>
      </section>
      <section className="dashboard-content">
        {renderVista()}
      </section>
    </section>
  );
}

export default DashboardLayout;
