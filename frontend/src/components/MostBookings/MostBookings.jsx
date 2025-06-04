import React, { useEffect, useState } from "react";
import "./MostBookings.css";
import axios from "axios";
const apiKey = process.env.REACT_APP_PUTUMAYOSTAY_API_KEY

function MostBookings() {
    const [user, setUser] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get("https://localhost:8077/usuarios/mostbookings",{headers: {"x-api-key": apiKey}})
                setUser(response.data[0]);
            }catch(error){
                console.error("Error al obtener el usuario con más reservas:", error);
            }
        }
        fetchData()
    },[])
    return(
        <section className="most-bookings">
            <img className="most-bookings-img" src={user.foto}></img>  
            <h1 className="most-bookings-username">{user.username}</h1>
            <h2 className="most-bookings-description">Por realizar la mayor cantidad de reservas en nuestra app.</h2>
            <h3 className="most-bookings-cant">Reservas realizadas: {user.total_reservas}</h3>
        </section>
        
    )
}

export default MostBookings;