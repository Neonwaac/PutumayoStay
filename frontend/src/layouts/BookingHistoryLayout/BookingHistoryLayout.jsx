import React, { useEffect, useState } from "react";
import "./BookingHistoryLayout.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BookingHistoryCard from "../../components/BookingHistoryCard/BookingHistoryCard";
const apiKey = process.env.REACT_APP_PUTUMAYOSTAY_API_KEY

function BookingHistoryLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [historyBookings, setHistoryBookings] = useState([]);
  const [maxHistoryCards, setMaxHistoryCards] = useState(3);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUserByToken = async () => {
      if (!token) return;
      try {
        const response = await axios.get(`https://localhost:8077/usuarios/token/${token}`,{headers: {"x-api-key": apiKey}});
        setUser(response.data);
      } catch (error) {
        console.error("Error al obtener el usuario por token:", error);
        navigate("/login");
      }
    };

    fetchUserByToken();
  }, [token, navigate]);

  useEffect(() => {
    const fetchHistoryBookings = async () => {
      if (!user) return;
      try {
        const response = await axios.get(`https://localhost:8077/reservas/history/${user.id}`,{headers: {"x-api-key": apiKey}});
        setHistoryBookings(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHistoryBookings();
  }, [user]);

  const showMoreHistory = () => {
    setMaxHistoryCards(prev => Math.min(prev + 3, historyBookings.length));
  };

  const showLessHistory = () => {
    setMaxHistoryCards(prev => Math.max(prev - 3, 3));
  };

  return (
    <section className="history-layout">
      {historyBookings.slice(0, maxHistoryCards).map((booking) => (
        <BookingHistoryCard
          key={booking.id}
          id={booking.id}
          monto={booking.monto}
          noches={booking.noches}
          timestamp={booking.timestamp}
          estado={booking.estado}
          nombre={booking.nombre}
          foto={booking.foto}
        />
      ))}

      <div className="history-layout-show">
        {maxHistoryCards < historyBookings.length && (
          <button
            className="history-layout-show-button history-layout-show-button-more"
            onClick={showMoreHistory}
          >
            Ver más
          </button>
        )}
        {maxHistoryCards > 3 && (
          <button
            className="history-layout-show-button history-layout-show-button-less"
            onClick={showLessHistory}
          >
            Ver menos
          </button>
        )}
      </div>
    </section>
  );
}

export default BookingHistoryLayout;

