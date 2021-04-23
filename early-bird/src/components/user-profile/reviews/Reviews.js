import "./Reviews.scss";
import {useState, useEffect} from "react";
import {GetReviewsForUser} from "../../../services/ReviewsService";
import Saly from "../../../illustrations/Saly-no-reviews.svg";

function Reviews(props){
    const [reviews, setReviews] = useState(null);
    const [useSaly, setUseSaly] = useState(false);

    function getRole(nb){
        switch(nb){
            case 1:
                return "admin";
            case 2:
                return "worker";
            case 3:
                return "publisher";
            default:
                return "";
        }
    }

    useEffect(()=>{
        async function fetchData(){
            let r = await GetReviewsForUser(props.userId);
            if(r.length === 0)
                setUseSaly(true);
            setReviews(r);
        }
        fetchData();
    }, [props.userId])


    function renderReviews(){
        if(reviews == null) return;
        return reviews.map((review, index)=>(
            <div key={index} className="review-card">
                <div className="review-card__dots">{renderRatingDots(review.rating)}</div>
                <div className="review-card__rating">{review.rating}</div>
                <div className="review-card__text">
                    <div className="review-card__text__description">{review.description}</div>
                    <div className="review-card__text__sender">
                        -{review.sender.firstname} {review.sender.lastname}, {getRole(review.sender.role)}
                    </div>
                </div>
            </div>
        ))
    }

    function renderRatingDots(rating){
        return [5,4,3,2,1].map((x)=>(
            <div className="review-card__dots__dot" 
                key={x}
                style={{background: x<=rating ? "#FB3640":  "#C4C4C4" }}
                ></div>
        ));
    }

    return (
        function(){
            return useSaly 
            ? 
            <div className="reviews__placeholder">
                <img className="reviews__placeholder__img" src={Saly} alt=""></img>
            </div>
            : 
            <div className="reviews">
                <div className="reviews__title">User reviews:</div>
                <div className="reviews-inner">
                    {renderReviews()}
                </div>
            </div>

        }()

    );
}

export default Reviews;
