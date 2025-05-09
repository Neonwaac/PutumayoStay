import React from "react";
import "./BestRecomendations.css";
import MostRooms from "../../components/MostRooms/MostRooms";
import MostBooked from "../../components/MostBooked/MostBooked";

function BestRecomendations() {
    return(
        <section className="best-recomendations">
            <h1 className="best-recomendations-title">Mejores Recomendaciones</h1>
            <MostRooms/>
            <MostBooked/>
        </section>
    )
}

export default BestRecomendations;