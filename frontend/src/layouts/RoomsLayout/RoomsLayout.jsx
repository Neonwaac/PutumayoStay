import react, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RoomsLayout.css";
import axios from "axios";
import RoomCard from "../../components/RoomCard/RoomCard";
import Swal from "sweetalert2";
function RoomsLayout({ maxRoomCards, category, search }) {
  const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [visibleRooms, setVisibleRooms] = useState(maxRoomCards);
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
        const response = await axios.get(
          `https://localhost:8077/usuarios/token/${token}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error al obtener el usuario por token:", error);
        navigate("/login");
      }
    };

    fetchUserByToken();
  }, [token, navigate]);
  useEffect(() => {
    const fetchRooms = async () => {
      let URI = "https://localhost:8077/rooms/";
      try {
        if (category) {
          URI += "category/" + category;
        }
        if (search) {
          URI += "search/" + search;
        }
        console.log(URI);
        const response = await axios.get(URI);
        setRooms(response.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error al obtener las habitaciones",
          text: "Intentalo de nuevo",
        });
      }
    };
    fetchRooms();
  }, [category]);
  const showMoreRooms = () => {
    setVisibleRooms((prev) => Math.min(prev + maxRoomCards, rooms.length));
  };

  const showLessRooms = () => {
    setVisibleRooms((prev) => Math.max(prev - maxRoomCards, maxRoomCards));
  };
  return (
    <section className="rooms-layout">
      {rooms.slice(0, visibleRooms).map((habitacion) => (
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
      ))}

      <div className="specific-reviews-layout-show">
        {visibleRooms < rooms.length && (
          <button
            className="specific-reviews-layout-show-button specific-reviews-layout-show-button-more"
            onClick={showMoreRooms}
          >
            Ver más
          </button>
        )}
        {visibleRooms > maxRoomCards && (
          <button
            className="specific-reviews-layout-show-button specific-reviews-layout-show-button-less"
            onClick={showLessRooms}
          >
            Ver menos
          </button>
        )}
      </div>
    </section>
  );
}

export default RoomsLayout;
