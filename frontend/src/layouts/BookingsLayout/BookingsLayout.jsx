import React, { useEffect, useState } from "react";
import "./BookingsLayout.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BookingCard from "../../components/BookingCard/BookingCard";

function BookingsLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [token, setToken] = useState(null);
  const [maxBookingCards, setMaxBookingCards] = useState(3);

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
    const fetchBookings = async () => {
      if (!user) return;
      try {
        const response = await axios.get("https://localhost:8077/reservas/" + user.id);
        setBookings(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookings();
  }, [user]);

  const showMoreBookings = () => {
    setMaxBookingCards(prev => Math.min(prev + 3, bookings.length));
  };

  const showLessBookings = () => {
    setMaxBookingCards(prev => Math.max(prev - 3, 3));
  };

  return (
    <section className="bookings-layout">
      {bookings.slice(0, maxBookingCards).map((booking) => (
        <BookingCard
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

      <div className="bookings-layout-show">
        {maxBookingCards < bookings.length && (
          <button
            className="bookings-layout-show-button bookings-layout-show-button-more"
            onClick={showMoreBookings}
          >
            Ver más
          </button>
        )}
        {maxBookingCards > 3 && (
          <button
            className="bookings-layout-show-button bookings-layout-show-button-less"
            onClick={showLessBookings}
          >
            Ver menos
          </button>
        )}
      </div>
    </section>
  );
}

export default BookingsLayout;
