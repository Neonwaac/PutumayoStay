import React from "react";
import './ReviewCard.css';
import { Link } from "react-router-dom";

function ReviewCard({id, valor, descripcion, timestamp, nombre_usuario, foto_usuario, nombre_habitacion}){
    const starValue = valor && !isNaN(valor) && valor > 0 ? "⭐".repeat(Math.min(valor, 5)) : "⭐";
    return(
        <section className="review-card">
            <div className="review-card-left">
                <img 
                    className="review-card-user-img" 
                    src={foto_usuario}
                    alt="Foto de perfil del usuario"
                />
            </div>
            <div className="review-card-center">
                <h2 className="review-card-user-name">
                    {nombre_usuario.toUpperCase()}
                    <span className="review-card-user-room">
                    ➜ <Link to="/" className="review-card-room-name">{nombre_habitacion}</Link>
                    </span>
                </h2>
                <p className="review-card-description">
                    {descripcion}
                </p>
            </div>
            <div className="review-card-right">
                <p className="review-card-stars">{starValue}</p>
                <h3 className="review-card-date">{new Date(timestamp).toLocaleDateString()}</h3>
            </div>
        </section>
    )
}

export default ReviewCard;