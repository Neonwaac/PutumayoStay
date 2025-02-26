import React, { useEffect } from "react";
import "./RoomPage.css";
import { useParams } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import AppFooter from "../../components/AppFooter/AppFooter.";
import SpecificRoomCard from "../../components/SpecificRoomCard/SpecificRoomCard";
function RoomPage() {
  const { id } = useParams();
  useEffect(() => {
    const fetchRoom = async() => {
      const response = await fetch("http://localhost:8077/rooms/"+id)
      const room = await response.json();
      console.log(room)
    }
    fetchRoom()

  }, [id]);
  return (
    <section clasName="specific-room-page">
      <NavigationBar />
      <SpecificRoomCard />
      <AppFooter />
    </section>
  );
}
export default RoomPage;
