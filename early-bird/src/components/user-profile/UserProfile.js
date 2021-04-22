import "./UserProfile.scss";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {GetUserById} from "../../services/UsersService";
import {GetUserId, GetRole} from "../../services/AccountService";
import UserCard from "../user-card/UserCard";
import Reviews from "./reviews/Reviews";

function UserProfile(){
    const [user, setUser] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [view, setView] = useState("");
    let {id} = useParams();
    
    useEffect(()=>{
        async function fetchData(){
            let u = await GetUserById(id);
            if(u == null) {
                window.location.href = "/404"
                return;
            }
            let loggedInUserId = GetUserId();
            let loggedInUserRole = GetRole();

            if(loggedInUserId === id)
                setView("owner");
            else{
                if(loggedInUserRole === u.role)
                    window.location.href="/404"
                setView("viewer");
            }
            setUser(u);
        }
        fetchData();
    }, [id]);

    return(
        <div className="user-profile--center">
            <div className="user-profile">
                <div className="user-profile__card">
                    <UserCard
                        user = {user}
                        />
                </div>
                <div className="user-profile__reviews">
                    <Reviews></Reviews>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;