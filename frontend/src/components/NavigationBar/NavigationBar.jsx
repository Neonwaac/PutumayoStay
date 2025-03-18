import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavigationBar.css";
import companyLogo from "../../assets/larger-light-logo.png";
import axios from "axios";
import Swal from "sweetalert2";
import defaultPhoto from "../../assets/default-user-photo.png"
function NavigationBar() {
    //RECUPERAR Y VALIDAR SI EL USUARIO EXISTE EN EL LOCALSTORAGE
  const [user, setUser] = useState();
  const navigate = useNavigate()
  useEffect(() => {
    const verifyToken = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
  
      if (!storedUser || !storedUser.token) {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
        return;
      }
  
      try {
        const response = await axios.post(
          "http://localhost:8077/verificar-token",
          {},
          {
            headers: {
              Authorization: `Bearer ${storedUser.token}`,
            },
          }
        );
  
        if (response.data.valido) {
          setUser(storedUser);
        } else {
          localStorage.removeItem("user");
          setUser(null);
          Swal.fire({
            icon: "error",
            title: "Sesión expirada",
            text: "Tu sesión ha expirado, por favor inicia sesión nuevamente.",
          });
          navigate("/login");
        }
      } catch (error) {
        localStorage.removeItem("user");
        setUser(null);
        Swal.fire({
          icon: "error",
          title: "Error al iniciar sesión",
          text: "Hubo un problema con la autenticación, intenta de nuevo.",
        });
        navigate("/login");
      }
    };
  
    verifyToken();
  }, [navigate]);  
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
                    <Link className="navigation-bar-user" to="/dashboard">
                    {user && user.foto ? <img className="navigation-bar-user-img" src={user.foto}></img>:
                    <img className="navigation-bar-user-img" src={defaultPhoto}></img>}
                    </Link>
                </div>
            </div>
        </section>
    );
}
export default NavigationBar;