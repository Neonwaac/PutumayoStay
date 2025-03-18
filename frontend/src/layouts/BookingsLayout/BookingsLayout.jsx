import React, { useEffect, useState } from "react";
import "./BookingsLayout.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BookingCard from "../../components/BookingCard/BookingCard";

function BookingsLayout(){
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    useEffect(()=>{
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          setUser(storedUser);
        } else {
          navigate("/login");
        }
      }, [navigate]);
      useEffect(() => {
        const fetchBookings = async() => {
            try {
                const response = await axios.get("http://localhost:8077/reservas/"+user.id);
                setBookings(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBookings();
      })
    return(
        <section className="bookings-layout">
            {
            bookings.map((booking) => (
            <BookingCard
            id={booking.id}
            monto={booking.monto}
            noches={booking.noches}
            timestamp={booking.timestamp}
            estado={booking.estado}
            nombre={booking.nombre}
            foto={booking.foto}
            />

            ))
            }
        </section>
    )

}

export default BookingsLayout;