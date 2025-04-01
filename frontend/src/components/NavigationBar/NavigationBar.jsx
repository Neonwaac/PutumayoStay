import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./NavigationBar.css";
import companyLogo from "../../assets/larger-light-logo.png";
import defaultPhoto from "../../assets/default-user-photo.png";

function NavigationBar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const verifyToken = async () => {
            // 1. Intentar obtener usuario desde los parámetros de la URL
            const params = new URLSearchParams(location.search);
            const usuarioParam = params.get("usuario");
            const tokenParam = params.get("token");

            let storedUser = JSON.parse(localStorage.getItem("user"));

            if (usuarioParam && tokenParam) {
                try {
                    // Decodificar JSON del usuario de la URL
                    const usuario = JSON.parse(decodeURIComponent(usuarioParam));
                    usuario.token = tokenParam;

                    // Guardarlo en localStorage
                    localStorage.setItem("user", JSON.stringify(usuario));

                    // Limpiar los parámetros de la URL
                    navigate("/", { replace: true });

                    // Usar el usuario extraído
                    storedUser = usuario;
                } catch (error) {
                    console.error("Error al parsear usuario desde parámetros:", error);
                }
            }

            // 2. Si no hay usuario en localStorage, redirigir a login
            if (!storedUser || !storedUser.token) {
                localStorage.removeItem("user");
                setUser(null);
                navigate("/login");
                return;
            }

            // 3. Verificar el token con el backend
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
                    throw new Error("Token inválido");
                }
            } catch (error) {
                localStorage.removeItem("user");
                setUser(null);
                Swal.fire({
                    icon: "error",
                    title: "Sesión expirada",
                    text: "Tu sesión ha expirado, por favor inicia sesión nuevamente.",
                });
                navigate("/login");
            }
        };

        verifyToken();
    }, [location, navigate]);

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
                        {user && user.foto ? (
                            <img className="navigation-bar-user-img" src={user.foto} alt="User" />
                        ) : (
                            <img className="navigation-bar-user-img" src={defaultPhoto} alt="Default User" />
                        )}
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default NavigationBar;
