import React from "react";
import "./SpecialRecognition.css";
import MostBookings from "../../components/MostBookings/MostBookings";
import MostPayments from "../../components/MostPayments/MostPayments";

function SpecialRecognition() {
    return(
        <section className="special-recognition">
            <h1 className="special-recognition-title">Reconocimiento especial a</h1>
            <MostBookings/>
            <MostPayments/>
        </section>
    )
}

export default SpecialRecognition;