import React, { useState } from "react";
import './SpecificRoomCard.css'
import AddBookingModal from "../AddBookingModal/AddBookingModal";

function SpecificRoomCard({id, nombre, descripcion, capacidad, foto, precio, categoria, nombre_empresa, telefono_empresa, correo_empresa, foto_empresa}){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false)
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
                    <img  src={foto_empresa} className="specific-room-card-company-img"></img>
                    <div className="specific-room-card-company-info">
                        <h3 className="specific-room-card-company-name">{nombre_empresa}</h3>
                        <h5 className="specific-room-card-company-email">{correo_empresa}</h5>
                        <h4 className="specific-room-card-company-number">+57 {telefono_empresa}</h4>
                    </div>
                    
                </div>
                <button className="specific-room-card-button"  onClick={openModal}>Reservar habitación ahora</button>
                <AddBookingModal isOpen={isModalOpen} onClose={closeModal} id_habitacion={id} precio={precio}/>
            </div>
        </section>
    )
}

export default SpecificRoomCard;