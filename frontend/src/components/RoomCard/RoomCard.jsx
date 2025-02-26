import React from "react";
import './RoomCard.css';
import { useNavigate } from "react-router-dom";
function RoomCard({key, id, nombre, descripcion, capacidad, foto, precio, categoria}){
    const navigate = useNavigate()
    const specificRoom = (e) => {
        e.preventDefault();
        navigate("/rooms/"+id)
    }
    return(
        <section className="room-card">
            <img className="room-card-image" src={foto} alt="foto"/>
            <div className="room-card-content">
                <h3 className="room-card-title">{nombre}</h3>
                <p className="room-card-description">{descripcion}</p>
                <p className="room-card-info">✔️ Capacidad para {capacidad} personas</p>
                <p className="room-card-info">✔️ $ {precio} por noche</p>
                <p className="room-card-info">✔️ Habitación {categoria}</p>
                <button className="room-card-info-button" onClick={specificRoom} >Mas info</button>
                <button className="room-card-button">Reservar Ahora</button>
            </div>
        </section>
    )
}

export default RoomCard;