import React, {useState, useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import './SpecificReviewsLayout.css'
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import AddReviewCard from "../../components/AddReviewCard/AddReviewCard";

function SpecificReviewsLayout({id, nombre_habitacion}){
    const [reviews, setReviews] = useState([]);
    const [maxReviewCards, setMaxReviewCards] = useState(1);

    useEffect(() => {
        const fetchRooms = async() =>{
            const response = await axios.get('http://localhost:8077/reviews/room/'+id)
            setReviews(response.data)
        }
        fetchRooms()
    },[])
    const showMoreReviews = () =>{
        setMaxReviewCards(maxReviewCards+2)
    }
    const showLessReviews = () => {
        setMaxReviewCards(maxReviewCards-2)
    }

    return(
        <section className="specific-reviews-layout">
            {reviews.length > 0 ? reviews.slice(0, maxReviewCards).map((review) => (
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
        )
    )
        :
        <h2 className="specific-reviews-layout-no-reviews">No hay reseñas sobre esta habitación</h2>
    }
    <div className="specific-reviews-layout-show">
    {maxReviewCards < reviews.length ?<button className="specific-reviews-layout-show-button specific-reviews-layout-show-button-more" onClick={showMoreReviews}>Ver más</button>: null}
    {maxReviewCards > 1 ? <button className="specific-reviews-layout-show-button specific-reviews-layout-show-button-less" onClick={showLessReviews}>Ver menos</button>:null}
    </div>
    <AddReviewCard 
                id_habitacion= {id}
                nombre_habitacion={nombre_habitacion}
    />
        </section>
    )
}

export default SpecificReviewsLayout;