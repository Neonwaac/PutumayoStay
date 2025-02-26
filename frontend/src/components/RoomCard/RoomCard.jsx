import React from "react";
import './RoomCard.css';

function RoomCard({id, nombre, descripcion, capacidad, foto, precio, categoria}){
    return(
        <section className="room-card">
            <img className="room-card-image" src={foto} alt="foto"/>
            <div className="room-card-content">
                <h3 className="room-card-title">{nombre}</h3>
                <p className="room-card-description">{descripcion}</p>
                <p className="room-card-info">✔️ Capacidad para {capacidad} personas</p>
                <p className="room-card-info">✔️ $ {precio} por noche</p>
                <p className="room-card-info">✔️ Habitación {categoria}</p>
                <button className="room-card-info-button">Mas info</button>
                <button className="room-card-button">Reservar Ahora</button>
            </div>
        </section>
    )
}

export default RoomCard;