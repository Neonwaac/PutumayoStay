import React, { useEffect, useState } from "react";
import "./MostRooms.css";
import axios from "axios";

function MostRooms() {
    const [empresa, setEmpresa] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://localhost:8077/empresa/mostrooms");
                setEmpresa(response.data[0]);
            } catch (error) {
                console.error("Error al obtener la empresa con más habitaciones:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <section className="most-rooms">
            <img src={empresa.foto} alt="Foto de empresa" className="most-rooms-img" />
            <div className="most-rooms-info">
                <h1 className="most-rooms-title">{empresa.nombre}</h1>
                <h2 className="most-rooms-description">{empresa.observacion}</h2>
                <h3 className="most-rooms-cant">Habitaciones registradas: {empresa.habitaciones}</h3>
            </div>
        </section>
    );
}

export default MostRooms;
