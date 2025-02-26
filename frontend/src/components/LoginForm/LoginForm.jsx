import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css";
import axios from "axios";
import companyLogo from "../../assets/larger-dark-logo.png";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const enviarFormulario = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8077/usuarios/login",
        { username, password }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.usuario));
      navigate("/");
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error al iniciar sesión",
            text: "Usuario o contraseña incorrectos",
          });
    }
  };
  return (
    <section className="login-form">
      <h1 className="login-form-title">Inicia Sesión</h1>
      <form className="login-form-form">
        <label className="login-form-label">Nombre de Usuario</label>
        <input
          type="text"
          className="login-form-input"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label className="login-form-label">Contraseña</label>
        <input
          type="password"
          className="login-form-input"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button onClick={enviarFormulario} className="login-form-button">
          Iniciar Sesión
        </button>
      </form>
      <p className="login-form-swap">
        ¿No tienes cuenta?
        <Link to="/register" className="login-form-link">
          {" "}
          Regístrate
        </Link>
      </p>
      <img className="login-form-image" src={companyLogo} alt="logo" />
      <h5 className="login-form-version">PUTUMAYO STAY v1.3</h5>
    </section>
  );
}

export default LoginForm;
