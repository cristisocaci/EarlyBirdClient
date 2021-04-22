import "./Reviews.scss";
import {useState, useEffect} from "react";
import {GetReviewsForUser} from "../../../services/ReviewsService";

function Reviews(props){
    const [reviews, setReviews] = useState(null);

    useEffect(()=>{
        async function fetchData(){
            let r = await GetReviewsForUser(props.userId);
            console.log(r);

            setReviews(r);
        }
        fetchData();
    }, [props.userId])
    return (
        <div>

        </div>
    );
}

export default Reviews;
