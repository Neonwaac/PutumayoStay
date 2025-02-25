import React, {useState, useEffect} from "react";
import "./RegisterForm.css";
import axios from "axios"
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import companyLogo from "../../assets/larger-dark-logo.png";

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const enviarFormulario = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8077/usuarios", {
                username,
                correo,
                password
            });
            toast.success('Te has registrado correctamente, ahora inicia sesión', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        } catch (error) {
            toast.error('Error al registrar tu usuario', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    };
    return (
        <section className="register-form">
             <h1 className="register-form-title">Regístrate</h1>
            <form className="register-form-form">
                <label className="register-form-label">Nombre de Usuario</label>
                <input type="text" className="register-form-input" onChange={(e) => setUsername(e.target.value)} />
                <label className="register-form-label" >Correo Electrónico</label>
                <input type="email" className="register-form-input" onChange={(e) => setCorreo(e.target.value)} />
                <label className="register-form-label">Contraseña</label>
                <input type="password" className="register-form-input" onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={enviarFormulario} className="register-form-button">Registrarse</button>
            </form>
            <p className="register-form-swap">¿Ya tienes una cuenta?<Link to="/login" className="register-form-link"> Inicia Sesión</Link></p>
            <img className="register-form-image" src={companyLogo} alt="logo"/>
            <h5 className="register-form-version">PUTUMAYO STAY v1.3</h5>
            <ToastContainer />
        </section>
    );
}

export default RegisterForm;