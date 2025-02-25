import react from "react";
import './RoomsLayout.css';
import RoomCard from "../../components/RoomCard/RoomCard";

function RoomsLayout(){
    return(
        <section className="rooms-layout">
            <RoomCard/>
            <RoomCard/>
            <RoomCard/>
        </section>
    )
}

export default RoomsLayout;