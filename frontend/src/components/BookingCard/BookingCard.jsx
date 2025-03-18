import React from "react";
import "./BookingCard.css";
import { FaPrint } from "react-icons/fa";
import axios from "axios";
function BookingCard({id, monto, noches, timestamp, estado, nombre, foto}){
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
    const printBooking = async () => {
        console.log(foto)
        try {
            const response = await axios.post("http://localhost:8077/reservas/generarPDF/"+id, {
                monto,
                noches,
                timestamp,
                estado,
                nombre,
                foto
            });
    
            // Redirigir al usuario a la URL del PDF generado
            if (response.data.url) {
                window.open(response.data.url, "_blank");
            }
        } catch (error) {
            console.error("Error al generar el PDF", error);
        }
    };
    
    return(
        <section className="booking-card">
            <p className="booking-card-date">{formatTimeAgo(timestamp)}</p>
            <hr className="booking-card-hr"></hr>
            <div className="booking-card-content">
                <img className="booking-card-img"src={foto} alt={nombre}/>
                <div className="booking-card-info-container">
                <h1 className="booking-card-title">{nombre}</h1>
                <p className="booking-card-info">Total a pagar: {monto}</p>
                <p className="booking-card-info">Noches totales: {noches}</p>
                </div>
                <button className="booking-card-button-print" onClick={printBooking}><FaPrint/></button>
                <div className="booking-card-buttons">
                <button className="booking-card-button-pay">Pagar</button>
                <button className="booking-card-button-cancel">Cancelar</button>
                </div>
            </div>
        </section>
    )
}

export default BookingCard;