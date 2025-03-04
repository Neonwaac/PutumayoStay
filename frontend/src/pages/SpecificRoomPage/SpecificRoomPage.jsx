import React, { useEffect, useState } from "react";
import "./SpecificRoomPage.css";
import { useParams } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import AppFooter from "../../components/AppFooter/AppFooter";
import SpecificRoomCard from "../../components/SpecificRoomCard/SpecificRoomCard";
function SpecificRoomPage() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  useEffect(() => {
    const fetchRoom = async() => {
      const response = await fetch("http://localhost:8077/rooms/"+id)
      const data = await response.json();
      setRoom(data)
    }
    fetchRoom()

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
      />
      <AppFooter />
    </section>
  );
}
export default SpecificRoomPage;
