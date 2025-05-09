import React, { useEffect, useState } from "react";
import "./MostPayments.css";
import axios from "axios";

function MostPayments() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://localhost:8077/usuarios/mostpayments");
                setUser(response.data[0]);
            } catch (error) {
                console.error("Error al obtener el usuario con más pagos:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <section className="most-payments">
            <img className="most-payments-img" src={user.foto} alt="Foto de usuario" />  
            <h1 className="most-payments-username">{user.username}</h1>
            <h2 className="most-payments-description">
                {user.observacion || "Por realizar la mayor cantidad de pagos en nuestra app."}
            </h2>
            <h3 className="most-payments-cant">Pagos realizados: {user.pagos_realizados}</h3>
        </section>
    );
}

export default MostPayments;
