import React, { useState } from 'react';
import './LRForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import companyLogo from '../assets/logo.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const URI = "http://localhost:8000/users/login";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // handleSubmit: Maneja el envío del formulario de inicio de sesión
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(URI, { username, password });
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: response.data.message,
                confirmButtonText: 'OK'
            }).then(() => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('userId', response.data.id); // Guarda el userId en localStorage
                localStorage.setItem('profileImage', response.data.profileImage);
                navigate('/');
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response ? error.response.data.message : 'Error de servidor',
                confirmButtonText: 'OK'
            });
        }
    };

    // Renderiza el formulario de inicio de sesión
    return (
        <div className='wrapper'>
            <div className='logo-container'>
                <img src={companyLogo} className='logo' alt='Logo'/>
            </div>
            <form onSubmit={handleSubmit}>
                <h1>Inicia Sesión</h1>
                <div className='input-box'>
                    <input
                        type='text'
                        placeholder='Nombre de usuario'
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <FaUser className='icon'/>
                </div>
                <div className='input-box'>
                    <input
                        type='password'
                        placeholder='Contraseña'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FaLock className='icon'/>
                </div>
                <button type='submit'>Iniciar Sesión</button>
                <div className='register-link'>
                    <p>No tienes una cuenta? <Link to='/register'>Regístrate</Link></p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;