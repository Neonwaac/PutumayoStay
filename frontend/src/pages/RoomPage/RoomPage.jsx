import React, { useEffect } from "react";
import "./RoomPage.css";
import { useParams } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import AppFooter from "../../components/AppFooter/AppFooter.";
function RoomPage() {
  const { id } = useParams();
  useEffect(() => {
    console.log("ID de la habitación:", id);
  }, [id]);
  return (
    <section clasName="specific-room-page">
      <NavigationBar />
      <div>ROOMPAGE #{id}</div>
      <AppFooter />
    </section>
  );
}
export default RoomPage;
