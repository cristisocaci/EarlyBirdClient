import React from 'react';
import './LeaveAReveiw.scss';
import TextField from '@material-ui/core/TextField';
import {useRef, useState, useEffect} from'react';
import {GetUserId} from '../../../services/AccountService';
import { AddReview } from '../../../services/ReviewsService';
import  {useHistory} from "react-router-dom";


function LeaveAReview(props) {
    const stars = [useRef(), useRef(), useRef(), useRef(), useRef()];
    const [nbOfStars, setNbOfStars] = useState(0);
    const [review, setReview] = useState('');
    const [error , setError] = useState(false);
    const [btnDisabled, setDisabled] = useState(false);
    const history = useHistory();
    
    useEffect(()=>{
        handleStarOut();
    })

    const handleStarHover = (index) =>{
        for(let i = 0; i <= index; ++i)
            stars[i].current.style.backgroundColor = '#FB3640';
    }

    const handleStarOut = () => {
        for(let i = 0; i <= nbOfStars; ++i)
            stars[i].current.style.backgroundColor = '#FB3640';
        for(let i = nbOfStars+1; i<5; ++i)
            stars[i].current.style.backgroundColor = '#fcb8c3';
    }
    const handleStarClick = (nb) => {
        setNbOfStars(nb);
    }

    const handleSend = () => {
        if(review === ''){
            setError(true)
            return;
        }
        let data = {
            senderId: GetUserId(),
            receiverId: props.userId,
            title: 'dummy',
            rating: nbOfStars+1,
            description: review
        }
        setDisabled(true);
        AddReview(data).then(()=>history.go(0))
    }
    return (
            <div className="leave-review">
                <div className="leave-review__title">Leave a review</div>

                <div className="leave-review__stars">
                    {
                        [0,1,2,3,4].map((nb, i) => (
                            <div className="leave-review__stars__star" 
                                onMouseOver={()=>handleStarHover(nb)} 
                                onMouseOut={()=>handleStarOut()} 
                                onClick={()=>handleStarClick(nb)}
                                ref={stars[nb]}
                                key={i}
                                ></div>
                        ))
                    }

                </div>
                <div className="leave-review__description">
                    <TextField
                        required
                        error={error}
                        id="outlined-multiline"
                        label="Review"
                        rows={4}
                        className="leave-review__description__input"
                        variant="outlined"
                        multiline
                        onChange={(e)=>setReview(e.target.value)}
                    />
                </div>
                <div className="leave-review__btn--center">
                    <button className="leave-review__btn round bg-red text-white btn-hover" onClick={handleSend} disabled={btnDisabled}>Send review</button>
                </div>
            </div>
    );
}

export default LeaveAReview;