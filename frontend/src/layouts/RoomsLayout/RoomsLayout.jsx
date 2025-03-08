import react,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './RoomsLayout.css';
import axios from 'axios';
import RoomCard from "../../components/RoomCard/RoomCard";
import Swal from "sweetalert2";
function RoomsLayout({maxRoomCards}){
    const [user, setUser] = useState(null);
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if(storedUser){
            setUser(storedUser);
        }else{
            navigate("/login")
        }
    },[navigate]);
    useEffect(() => {
        const fetchRooms = async() => {
            try {
                const response = await axios.get("http://localhost:8077/rooms");
                setRooms(response.data)
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error al obtener las habitaciones",
                    text: "Intentalo de nuevo",
                });
            }
        }
        fetchRooms()
    }, [])
    return(
        <section className="rooms-layout">
            { (maxRoomCards ? rooms.slice(0, maxRoomCards) : rooms).map((habitacion) => (
                <RoomCard
                key={habitacion.id}
                id={habitacion.id}
                nombre={habitacion.nombre}
                descripcion={habitacion.descripcion}
                capacidad={habitacion.capacidad}
                foto={habitacion.foto}
                precio={habitacion.precio}
                categoria={habitacion.categoria}
                id_empresa={habitacion.id_empresa}
                />
            ))
            }
        </section>
    )
}

export default RoomsLayout;