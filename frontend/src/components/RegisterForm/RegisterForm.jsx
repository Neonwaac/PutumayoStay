import React from "react";
import "./RegisterForm.css";
import { Link } from "react-router-dom";
import companyLogo from "../../assets/larger-dark-logo.png";
function RegisterForm() {
    return (
        <section className="register-form">
             <h1 className="register-form-title">Regístrate</h1>
            <form className="register-form-form">
                <label className="register-form-label">Nombre de Usuario</label>
                <input type="text" className="register-form-input" />
                <label className="register-form-label">Correo Electrónico</label>
                <input type="email" className="register-form-input" />
                <label className="register-form-label">Contraseña</label>
                <input type="password" className="register-form-input" />
                <button className="register-form-button">Registrarse</button>
            </form>
            <p className="register-form-swap">¿Ya tienes una cuenta?<Link to="/login" className="register-form-link"> Inicia Sesión</Link></p>
            <img className="register-form-image" src={companyLogo} alt="logo"/>
            <h5 className="register-form-version">PUTUMAYO STAY v1.3</h5>
            
        </section>
    );
}

export default RegisterForm;