import React, { useEffect, useState } from "react";
import "./BookingHistoryLayout.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BookingHistoryCard from "../../components/BookingHistoryCard/BookingHistoryCard";

function BookingHistoryLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [historyBookings, setHistoryBookings] = useState([]);

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
        const response = await axios.get(`https://localhost:8077/usuarios/token/${token}`);
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
        const response = await axios.get(`https://localhost:8077/reservas/history/${user.id}`);
        setHistoryBookings(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHistoryBookings();
  }, [user]);

  return (
    <section className="history-layout">
      {historyBookings.map((booking) => (
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
    </section>
  );
}

export default BookingHistoryLayout;