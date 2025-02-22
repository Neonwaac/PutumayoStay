import React from "react";
import './RoomCard.css';
import hotelPhoto from "../../assets/PALETA-PUTUMAYOSTAY.jpg"
function RoomCard(){
    return(
        <section className="room-card">
            <img className="room-card-image" src={hotelPhoto} alt="foto"/>
            <div className="room-card-content">
                <h3 className="room-card-title">Habitación Ejecutiva</h3>
                <p className="room-card-description">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                <p className="room-card-info">✔️ Capacidad para 20 personas</p>
                <p className="room-card-info">✔️ Desde $20.000 por noche</p>
                <p className="room-card-info">✔️ Habitación tipo Ejecutiva</p>
                <button className="room-card-button">Reservar Ahora</button>
            </div>
        </section>
    )
}

export default RoomCard;