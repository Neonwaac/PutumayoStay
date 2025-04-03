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