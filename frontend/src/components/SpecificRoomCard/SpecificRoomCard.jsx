import React from "react";
import './SpecificRoomCard.css'

function SpecificRoomCard({id, nombre, descripcion, capacidad, foto, precio, categoria}){
    return(
        <section className="specific-room-card">
            <div className="specific-room-card-left">
                <img className="specific-room-card-img" src={foto}></img>
            </div>
            <div className="specific-room-card-right">
                <h1 className="specific-room-card-title">{nombre}</h1>
                <h2 className="specific-room-card-description">{descripcion}</h2>
                <p className="specific-room-card-data">Capacidad para {capacidad} personas</p>
                <p className="specific-room-card-data">$ {precio} por noche</p>
                <p className="specific-room-card-data">Habitación {categoria}</p>
                <div className="specific-room-card-company">
                    <img  src="http://localhost:8077/uploads/images/habitacion1.jpg" className="specific-room-card-company-img"></img>
                    <div className="specific-room-card-company-info">
                        <h3 className="specific-room-card-company-name">Hotel Oceano</h3>
                        <h5 className="specific-room-card-company-email">hoteloceano@gmail.com</h5>
                        <h4 className="specific-room-card-company-number">+57 312 390 3681</h4>
                    </div>
                    
                </div>
                <button className="specific-room-card-button">Reservar habitación ahora</button>
            </div>
        </section>
    )
}

export default SpecificRoomCard;