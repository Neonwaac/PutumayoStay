import React, {useEffect, useState} from "react";
import './RoomCard.css';
import { useNavigate } from "react-router-dom";
import axios from "axios"
import Swal from "sweetalert2";
function RoomCard({key, id, nombre, descripcion, capacidad, foto, precio, categoria, id_empresa}){
    const [user, setUser] = useState(null);
    const navigate = useNavigate()
    const [token, setToken] = useState(null);
    
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
                const response = await axios.get(`http://localhost:8077/usuarios/token/${token}`);
                setUser(response.data);
            } catch (error) {
                console.error("Error al obtener el usuario por token:", error);
                navigate("/login"); 
            }
        };
    
        fetchUserByToken();
    }, [token, navigate]);
    const specificRoom = (e) => {
        e.preventDefault();
        navigate("/specificroom/"+id)
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
    
    return(
        <section className="room-card">
            <img className="room-card-image" src={foto} alt="foto"/>
            {user && (Number(user.rol) === 2 || (Number(user.rol) == 3 && user.id == id_empresa)) ?<button className="room-card-delete-button" onClick={deleteRoom}>Eliminar</button>:null}
            <div className="room-card-content">
                <h3 className="room-card-title">{nombre}</h3>
                <p className="room-card-description">{descripcion}</p>
                <p className="room-card-info">✔️ Capacidad para {capacidad} personas</p>
                <p className="room-card-info">✔️ $ {precio} por noche</p>
                <p className="room-card-info">✔️ Habitación {categoria}</p>
                <button className="room-card-info-button" onClick={specificRoom} >Mas info</button>
                <button className="room-card-button" onClick={specificRoom} >Reservar Ahora</button>
            </div>
        </section>
    )
}

export default RoomCard;