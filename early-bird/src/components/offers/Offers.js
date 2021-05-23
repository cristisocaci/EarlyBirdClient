import "./Offers.scss";
import AboutOffer from "./about-offer/AboutOffer";
import {GetOfferById} from "../../services/OffersService";
import {GetRole, GetUserId} from "../../services/AccountService";

import {useParams, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import UserCard from "../user-card/UserCard";

import {useDispatch} from 'react-redux';
import {startLoader, stopLoader} from '../../redux/actions';

function Offers(){
    let {id} = useParams();
    const [role, setRole] = useState("")
    const [offer, setOffer] = useState({});
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=>{
        async function fetchData(){
            dispatch(startLoader());
            let o = await GetOfferById(id);
            if(o == null){
                history.push('/404');
                return;
            }
            let roleAux = GetRole();
            if (roleAux === "publisher" && o.publisherId !== GetUserId())
                history.push('/home');
            if (roleAux === "admin") roleAux = "worker";
            o.categories = o.categories.map(x=>x.category)

            setRole(roleAux)
            setOffer(o);
            dispatch(stopLoader());
        }
        fetchData();
    }, [id, history, dispatch])
    return (
        <div className="center-offer">
            <div className="offer">
                <AboutOffer
                    id = {offer.id}
                    title = {offer.title}
                    categories = {offer.categories}
                    cost = {offer.cost}
                    description = {offer.description}
                    prerequisites = {offer.prerequisites}
                    location = {offer.location}
                    publisher = {offer.publisher}
                    role = {role}
                />
                <div className="center-user-card-offer">
                    <UserCard 
                        user = {offer.publisher}
                        header = "About the publisher"
                    />
                </div>
            </div>
        </div>
    );
}

export default Offers;