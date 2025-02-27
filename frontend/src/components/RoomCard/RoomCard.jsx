import React, {useEffect, useState} from "react";
import './RoomCard.css';
import { useNavigate } from "react-router-dom";
import axios from "axios"
import Swal from "sweetalert2";
function RoomCard({key, id, nombre, descripcion, capacidad, foto, precio, categoria}){
    const [user, setUser] = useState(null);
    const navigate = useNavigate()
    const specificRoom = (e) => {
        e.preventDefault();
        navigate("/rooms/"+id)
    }
    const deleteRoom = (e) => {
         e.preventDefault();
         Swal.fire({
            title: "Estas seguro de eliminar esta habitación?",
            text: "No podrás revertir este cambio!",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              try{
                axios.delete("http://localhost:8077/rooms/"+id);
                window.location.reload(true);
              }catch(error){
                Swal.fire({
                        icon: "error",
                        title: "Error al publicar la habitación",
                        text: "Verifica el servidor o la BD",
                    });
              }
            }
          });
    }
      useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          setUser(storedUser);
        } else {
          navigate("/login");
        }
      }, [navigate]);
    
    return(
        <section className="room-card">
            <img className="room-card-image" src={foto} alt="foto"/>
            {user && Number(user.rol) === 2 && <button className="room-card-delete-button" onClick={deleteRoom}>Eliminar</button>}
            <div className="room-card-content">
                <h3 className="room-card-title">{nombre}</h3>
                <p className="room-card-description">{descripcion}</p>
                <p className="room-card-info">✔️ Capacidad para {capacidad} personas</p>
                <p className="room-card-info">✔️ $ {precio} por noche</p>
                <p className="room-card-info">✔️ Habitación {categoria}</p>
                <button className="room-card-info-button" onClick={specificRoom} >Mas info</button>
                <button className="room-card-button">Reservar Ahora</button>
            </div>
        </section>
    )
}

export default RoomCard;