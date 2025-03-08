import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavigationBar.css";
import companyLogo from "../../assets/larger-light-logo.png";
import axios from "axios";
import Swal from "sweetalert2";
function NavigationBar() {
    //RECUPERAR Y VALIDAR SI EL USUARIO EXISTE EN EL LOCALSTORAGE
  const [user, setUser] = useState();
  const navigate = useNavigate()
  useEffect(() => {
    const verifyToken = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser || !storedUser.token) {
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
          Swal.fire({
           icon: "error",
           title: "Error al iniciar sesión",
           text: "Usuario o contraseña incorrectos",
           });
          localStorage.removeItem("user");
          navigate("/login");
        }
      } catch (error) {
        localStorage.removeItem("user");
        Swal.fire({
          icon: "error",
          title: "Error al iniciar sesión",
          text: "Usuario o contraseña incorrectos",
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
                    <Link className="navigation-bar-link" to="/dashboard">Cuenta</Link>
                </div>
            </div>
        </section>
    );
}
export default NavigationBar;