import React, { useEffect, useState } from "react";
import "./SpecificRoomPage.css";
import { useParams } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import AppFooter from "../../components/AppFooter/AppFooter";
import SpecificRoomCard from "../../components/SpecificRoomCard/SpecificRoomCard";
import SpecificReviewsLayout from "../../layouts/SpecificReviewsLayout/SpecificReviewsLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
function SpecificRoomPage() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  //RECUPERAR Y VALIDAR SI EL USUARIO EXISTE EN EL LOCALSTORAGE
  const [user, setUser] = useState();
  const navigate = useNavigate()
  useEffect(() => {
    const verifyToken = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser || !storedUser.token) {
        navigate("/login");
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:8077/verificar-token",
          {},
          {
            headers: {
              Authorization: `Bearer ${storedUser.token}`,
            },
          }
        );
        if (response.data.valido) {
          setUser(storedUser);
        } else {
          Swal.fire({
           icon: "error",
           title: "Error al iniciar sesión",
           text: "Usuario o contraseña incorrectos",
           });
          localStorage.removeItem("user");
          navigate("/login");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error al iniciar sesión",
          text: "Usuario o contraseña incorrectos",
          });
        localStorage.removeItem("user");
        navigate("/login");
      }
    };
    verifyToken();
  }, [navigate]);
  //FETCH A LA HABIACIÓN DEL PARAMETRO ACTUAL id
  useEffect(() => {
    const fetchRoom = async () => {
      const response = await fetch("http://localhost:8077/rooms/" + id);
      const data = await response.json();
      setRoom(data);
    };
    fetchRoom();
  }, [id]);
  if (!room) {
    return;
  }
  return (
    <section clasName="specific-room-page">
      <NavigationBar />
      <SpecificRoomCard
        id={room.id}
        nombre={room.nombre}
        descripcion={room.descripcion}
        capacidad={room.capacidad}
        foto={room.foto}
        precio={room.precio}
        categoria={room.categoria}
        nombre_empresa={room.nombre_empresa}
        telefono_empresa={room.telefono_empresa}
        correo_empresa={room.correo_empresa}
        foto_empresa={room.foto_empresa}
      />
      <h1 className="specific-room-page-reviews-title">
        Reseñas de {room.nombre}
      </h1>
      <SpecificReviewsLayout id={room.id} nombre_habitacion={room.nombre}/>
      <AppFooter />
    </section>
  );
}
export default SpecificRoomPage;
