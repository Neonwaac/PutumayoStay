import React, {useEffect, useState} from "react";
import './ReviewsLayout.css';
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import axios from "axios";
import Swal from "sweetalert2";
const apiKey = process.env.REACT_APP_PUTUMAYOSTAY_API_KEY;
function ReviewsLayout({maxReviewCards}){
    const [reviews, setReviews] = useState([]);
    useEffect(() =>{
        const fetchReviews = async () =>{
            try {
                const response = await axios.get("https://localhost:8077/reviews", {headers: {"x-api-key": apiKey}})
                setReviews(response.data)
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error al obtener las habitaciones",
                    text: "Intentalo de nuevo",
                });
            }
        }
        fetchReviews();
    },[])
    return(
        <section className="reviews-layout">
            {reviews.slice(0, maxReviewCards).map((review) => (
                <ReviewCard 
                id={review.id}
                valor={review.valor}
                descripcion={review.descripcion}
                timestamp={review.timestamp}
                nombre_usuario={review.nombre_usuario}
                foto_usuario={review.foto_usuario}
                nombre_habitacion={review.nombre_habitacion}
                id_habitacion={review.id_habitacion}
                />
            ))}
        </section>
    )
}

export default ReviewsLayout;