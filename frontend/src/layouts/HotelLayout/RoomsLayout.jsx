import react from "react";
import './RoomsLayout.css';
import { Link } from "react-router-dom";

function RoomsLayout(){
    return(
        <section className="hotel-layout">
            <div className="hotel-layout-view-all-container">
                <h1 className="hotel-layout-title">Habitaciones</h1>
                <button onClick={(event)=>{event.preventDefault();viewAll("rooms");}} className="hotel-layout-view-all-button">Ver todas las habitaciones</button>
            </div>
            
        </section>
    )
}