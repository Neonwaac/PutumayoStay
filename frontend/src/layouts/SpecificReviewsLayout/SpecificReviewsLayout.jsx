import React, {useState, useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import './SpecificReviewsLayout.css'
import ReviewCard from "../../components/ReviewCard/ReviewCard";

function SpecificReviewsLayout({id}){
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        const fetchRooms = async() =>{
            const response = await axios.get('http://localhost:8077/reviews/room/'+id)
            setReviews(response.data)
        }
        fetchRooms()
    },[])
    return(
        <section className="specific-reviews-layout">
            {reviews.length > 0 ? reviews.map((review) => (
            <ReviewCard 
            id={review.id}
            valor={review.valor}
            descripcion={review.descripcion}
            timestamp={review.timestamp}
            nombre_usuario={review.nombre_usuario}
            foto_usuario={review.foto_usuario}
            nombre_habitacion={review.nombre_habitacion}
            />
        )
    )
        :
        <h2 className="specific-reviews-layout-no-reviews">No hay reviews sobre esta habitación</h2>
    }
        </section>
    )
}

export default SpecificReviewsLayout;