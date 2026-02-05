import React, { useEffect, useState } from "react";
import './ReviewCard.css';
import { Link, useNavigate } from "react-router-dom";
import defaultPhoto from "../../assets/default-user-photo.png"
import axios from "axios";
import Swal from "sweetalert2";

function ReviewCard({id, valor, descripcion, timestamp, nombre_usuario, foto_usuario, nombre_habitacion, id_habitacion, id_usuario}){
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const starValue = valor && !isNaN(valor) && valor > 0 ? "⭐".repeat(Math.min(valor, 5)) : "⭐";
    
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get(`https://localhost:8077/usuarios/token/${token}`);
                    setUser(response.data);
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            }
        };
        fetchUser();
    }, []);

    const handleDelete = async () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`https://localhost:8077/reviews/${id}`);
                    Swal.fire(
                        'Eliminado!',
                        'Tu comentario ha sido eliminado.',
                        'success'
                    ).then(() => {
                        window.location.reload();
                    });
                } catch (error) {
                    Swal.fire(
                        'Error!',
                        'Hubo un problema al eliminar el comentario.',
                        'error'
                    );
                }
            }
        })
    };

    const formatTimeAgo = (timestamp) => {
        const now = new Date();
        const reviewDate = new Date(timestamp);
        const diffInSeconds = Math.floor((now - reviewDate) / 1000);
        if (diffInSeconds < 60) {
            return `hace ${diffInSeconds} segundos`;
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `hace ${minutes} minuto${minutes !== 1 ? 's' : ''}`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `hace ${hours} hora${hours !== 1 ? 's' : ''}`;
        } else {
            return new Date(timestamp).toLocaleDateString();
        }
    };
    return(
        <section className="review-card">
            <div className="review-card-left">
                <img 
                    className="review-card-user-img" 
                    src={foto_usuario ? foto_usuario : defaultPhoto}
                    alt="Foto de perfil del usuario"
                />
            </div>
            <div className="review-card-center">
                <h2 className="review-card-user-name">
                    {nombre_usuario.toUpperCase()}
                    <span className="review-card-user-room">
                    ➜ <Link to={"/specificroom/"+id_habitacion} className="review-card-room-name">{nombre_habitacion}</Link>
                    </span>
                </h2>
                <p className="review-card-description">
                    {descripcion}
                </p>
            </div>
            <div className="review-card-right">
                <p className="review-card-stars">{starValue}</p>
                <h3 className="review-card-date">{formatTimeAgo(timestamp)}</h3>
                {user && (user.rol === 2 || user.id === id_usuario) && (
                    <button className="review-card-delete-btn" onClick={handleDelete}>
                        Eliminar
                    </button>
                )}
            </div>
        </section>
    )
}

export default ReviewCard;