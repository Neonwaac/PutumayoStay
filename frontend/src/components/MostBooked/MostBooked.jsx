import React, { useEffect, useState } from "react";
import "./MostBooked.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const apiKey = process.env.REACT_APP_PUTUMAYOSTAY_API_KEY

function MostBooked() {
    const [room, setRoom] = useState({});
    const Navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get("https://localhost:8077/rooms/mostbooked",{headers: {"x-api-key": apiKey}})
                setRoom(response.data);
            }catch(error){
                console.error("Error al obtener la habitación más reservada:", error);
            }
        }
        fetchData()
    },[])
    return(
        <section onClick={(e) => Navigate("/specificroom/"+room.id)} className="most-booked">
            <img src={room.foto} alt="Foto de habitación" className="most-booked-img" />
            <div className="most-booked-info">
            <h1 className="most-booked-title" >{room.nombre}</h1>
            <h2 className="most-booked-description">{room.observacion}</h2>
            <h3 className="most-booked-cant">Cantidad de reservas: {room.reservas}</h3>
            </div>
        </section>
    )
}

export default MostBooked;