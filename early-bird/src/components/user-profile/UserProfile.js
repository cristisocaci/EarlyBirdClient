import "./UserProfile.scss";
import {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
import {GetUserById} from "../../services/UsersService";
import {GetUserId, GetRole} from "../../services/AccountService";
import UserCard from "../user-card/UserCard";
import Reviews from "./reviews/Reviews";

import {useDispatch} from 'react-redux';
import {startLoader, stopLoader} from '../../redux/actions';

function UserProfile(){
    const [user, setUser] = useState(null);
    const [view, setView] = useState("");
    let {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    
    useEffect(()=>{
        async function fetchData(){
            dispatch(startLoader());
            let u = await GetUserById(id);
            dispatch(stopLoader());
            if(u == null) {
                history.push('/404');
                return;
            }
            let loggedInUserId = GetUserId();
            let loggedInUserRole = GetRole();

            if(loggedInUserId === id)
                setView("owner");
            else{
                if(loggedInUserRole === getRole(u.role)){
                    history.push('/404');
                    return;
                }
                setView("viewer");
            }
            setUser(u);
        }
        fetchData();
    }, [id, history]);

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

    return(
        <div className="user-profile--center">
            <div className="user-profile">
                <div className="user-profile__card">
                    <UserCard
                        user = {user}
                        />
                    <div className="user-profile__buttons">
                        {function(){
                                return view === "viewer"
                                ? <div className="w-100">
                                    <button className="round bg-pink text-red btn-hover px-3 py-2 w-100">Contact this user</button>
                                    <button className="round bg-red text-white btn-hover px-3 py-2 mt-3 w-100">Write a review</button>
                                    </div>
                                : <button className="round bg-red text-white btn-hover px-3 py-2 w-100">Edit profile</button>
                            }()}

                    </div>
                </div>
                <div className="user-profile__reviews">
                    <Reviews
                        userId = {id}
                    />
                </div>
            </div>
        </div>
    );
}

export default UserProfile;