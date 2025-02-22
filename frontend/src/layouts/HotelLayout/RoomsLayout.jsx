import react from "react";
import './RoomsLayout.css';
import RoomCard from "../../components/RoomCard/RoomCard";

function RoomsLayout(){
    return(
        <section className="rooms-layout">
            <div className="rooms-layout-view-all-container">
                <h1 className="rooms-layout-title">Habitaciones</h1>
                <button className="rooms-layout-view-all-button">Ver todas las habitaciones</button>

            </div>
            <RoomCard/>
            <RoomCard/>
        </section>
    )
}

export default RoomsLayout;