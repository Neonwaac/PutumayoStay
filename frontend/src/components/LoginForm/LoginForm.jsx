import React from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css";
import companyLogo from "../../assets/larger-dark-logo.png";
function LoginForm(){
    return (
        <section className="login-form">
            <h1 className="login-form-title">Inicia Sesión</h1>
            <form className="login-form-form">
                <label className="login-form-label">Nombre de Usuario</label>
                <input type="text" className="login-form-input" />
                <label className="login-form-label">Contraseña</label>
                <input type="password" className="login-form-input" />
                <button className="login-form-button">Iniciar Sesión</button>
            </form>
            <p className="login-form-swap">¿No tienes cuenta?<Link to="/register" className="login-form-link"> Regístrate</Link></p>
            <img className="login-form-image" src={companyLogo} alt="logo"/>
        </section>
    );
}

export default LoginForm;