import "./UserCard.scss";
import {useRef, useEffect} from "react";
import {useHistory} from 'react-router-dom';
function UserCard(props){
    const history = useHistory();
    let avatarRef = useRef();
    let dotRefs = useRef([]);

    function getUserId(){
        if(props.user == null) return;
        return props.user.id;
    }

    function renderName(){
        if(props.user == null) return;
        return props.user.firstname + " " + props.user.lastname;
    }

    function renderInitials(){
        if(props.user == null) return;
        return (props.user.firstname.charAt(0) + props.user.lastname.charAt(0)).toUpperCase();
    }

    function renderRating(){
        if(props.user == null) return;
        return parseFloat(props.user.avgRating).toFixed(1);
    }

    function renderRatingDots(){
        return [0,1,2,3,4].map((x)=>(
            <div className="user-card__rating__dot" 
                ref={element => dotRefs.current.push(element)}
                key={x}></div>
        ));
    }

    function random(max){
        return Math.floor(Math.random() * max)
    } 
    
    function redirectTo(page){
        history.push(page);
    }

    useEffect(()=>{
        let colors = ["7da172","8ab17d","a2b679","babb74","e9c46a","efb366","f4a261","ee8959","e76f51","e97c61"]
        avatarRef.current.style.background ="#"+colors[random(colors.length-1)]

        if(props.user == null) return;
        for(let i=1; i <= props.user.avgRating; ++i)
            dotRefs.current[i-1].style.background = "#FFD700";
        if(!Number.isInteger(props.user.avgRating)){
            let i = Math.floor(props.user.avgRating)
            dotRefs.current[i].style.background = "linear-gradient(90deg, #FFD700 50%, #C4C4C4 50%)";
        }
    },[props.user])
    return (
        <div className="user-card" onClick={()=>redirectTo("/users/"+getUserId())}>
            <div className="user-card__header">{props.header}</div>
            <div className="user-card__avatar" ref={avatarRef}>{renderInitials()}</div>
            <div className="user-card__name">{renderName()}</div>
            <div className="user-card__rating">
                {renderRating()}
                {renderRatingDots()}
            </div>
        </div>
    );
}

export default UserCard;