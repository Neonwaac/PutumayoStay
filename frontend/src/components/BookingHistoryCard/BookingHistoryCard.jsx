import React from "react";
import "./BookingHistoryCard.css";
import { FaPrint } from "react-icons/fa";
import axios from "axios";
const apiKey = process.env.REACT_APP_PUTUMAYOSTAY_API_KEY

function BookingHistoryCard({ id, monto, noches, timestamp, estado, nombre, foto }) {
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
    try {
      const response = await axios.post(`https://localhost:8077/reservas/generarPDF/${id}`, {headers: {"x-api-key": apiKey}},{
        monto,
        noches,
        timestamp,
        estado,
        nombre,
        foto
      });
      if (response.data.url) {
        window.open(response.data.url, "_blank");
      }
    } catch (error) {
      console.error("Error al generar el PDF", error);
    }
  };

  return (
    <section className="history-card">
      <p className="history-card-date">{formatTimeAgo(timestamp)}</p>
      <hr className="history-card-hr" />
      <div className="history-card-content">
        <img className="history-card-img" src={foto} alt={nombre} />
        <div className="history-card-info-container">
          <h1 className="history-card-title">{nombre}</h1>
          <p className="history-card-info">Total pagado: {monto}</p>
          <p className="history-card-info">Noches: {noches}</p>
          <p className="history-card-info">Estado: {estado}</p>
        </div>
        <button className="history-card-button-print" onClick={printBooking}>
          <FaPrint />
        </button>
      </div>
    </section>
  );
}

export default BookingHistoryCard;
