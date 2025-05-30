import React, { useEffect, useState } from "react";
import './AddReviewCard.css';
import { FaStar, FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AddReviewCard({ id_habitacion, nombre_habitacion }) {
    const [id_usuario, setUser] = useState("");
    const [stars, setStars] = useState(0);
    const [descripcion, setDescripcion] = useState("");
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        } else {
            navigate("/login");
        }
    }, [navigate]);
    
    useEffect(() => {
        const fetchUserByToken = async () => {
            if (!token) return;
    
            try {
                const response = await axios.get(`https://localhost:8077/usuarios/token/${token}`);
                setUser(response.data.id);
            } catch (error) {
                console.error("Error al obtener el usuario por token:", error);
                navigate("/login"); 
            }
        };
    
        fetchUserByToken();
    }, [token, navigate]);

    const setStarsValue = (actualStarsValue) => {
        setStars(actualStarsValue);
    };

    const handleSubmit = async () => {
        if (stars === 0 || descripcion.trim() === "" || descripcion.length < 10) {
            console.log("Por favor, selecciona una calificación y escribe un comentario.");
            return;
        }

        const reviewData = {
            valor: stars,
            descripcion,
            id_usuario,
            id_habitacion
        };
        try {
            await axios.post("https://localhost:8077/reviews", reviewData);
            Swal.fire({
                title: "Publicada!",
                text: "Tu reseña ha sido publicada",
                icon: "success"
            });
            window.location.reload(true)
        } catch (error) {
            Swal.fire({
                icon: "error",
                 title: "Error al publicar la reseña",
                 text: "Verifica el servidor o la BD",
             });
        }
    }

    return (
        <section className="add-review-card">
            <h3 className="add-review-card-title">
                Deja tu opinión ➜
                <span className="add-review-card-nombre-habitacion"> {nombre_habitacion}</span>
            </h3>
            <div className="add-review-card-stars-container">
                {[1, 2, 3, 4, 5].map((num) => (
                    <FaStar
                        key={num}
                        onClick={() => setStarsValue(num)}
                        className={`add-review-card-star ${stars >= num ? "selected" : ""}`}
                    />
                ))}
            </div>

            <textarea
                className="add-review-card-text-area"
                maxLength="200"
                placeholder="Escribe tu comentario aquí..."
                required
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>

            <button 
                className="add-review-card-button" 
                onClick={handleSubmit} 
            >
                <FaPaperPlane className="add-review-card-button-icon" />
                Enviar reseña
            </button>
        </section>
    );
}

export default AddReviewCard;