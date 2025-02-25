import react from "react";
import './ReviewCard.css';
import { RiDeleteBinFill } from "react-icons/ri";
function ReviewCard(){
    return(
        <section className="review-card">
            <div className="review-card-left">
                <p className="review-card-user">Neonwaac</p>
                <h3 className="review-card-stars">⭐⭐⭐</h3>
            </div>
            <div className="review-card-center">
                <p className="review-card-description">Me gusto la página toma un like</p>
            </div>
            <div className="review-card-right">
                <p className="review-card-date">
                    Realizada el 22/02/2025
                </p>
            </div>
            <button className="review-card-delete-button">
            <RiDeleteBinFill />
            </button>
        </section>
    )
}

export default ReviewCard