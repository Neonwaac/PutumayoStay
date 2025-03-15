import React from "react";
import './ReviewCard.css';
import { Link } from "react-router-dom";
import defaultPhoto from "../../assets/default-user-photo.png"
function ReviewCard({id, valor, descripcion, timestamp, nombre_usuario, foto_usuario, nombre_habitacion, id_habitacion}){
    const starValue = valor && !isNaN(valor) && valor > 0 ? "⭐".repeat(Math.min(valor, 5)) : "⭐";
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
            </div>
        </section>
    )
}

export default ReviewCard;