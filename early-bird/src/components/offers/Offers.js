import "./Offers.scss";
import AboutOffer from "./about-offer/AboutOffer";
import {GetOfferById} from "../../services/OffersService";
import {GetRole, GetUserId} from "../../services/AccountService";

import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import UserCard from "../user-card/UserCard";

function Offers(){
    let {id} = useParams();
    const [role, setRole] = useState("")
    const [offer, setOffer] = useState({});

    useEffect(()=>{
        async function fetchData(){
            let o = await GetOfferById(id);
            if(o == null){
                window.location.href ="/404";
                return;
            }
            let roleAux = GetRole();
            if (roleAux === "publisher" && o.publisherId !== GetUserId())
                window.location.href = '/home'
            if (roleAux === "admin") roleAux = "worker";
            o.categories = o.categories.map(x=>x.category)

            setRole(roleAux)
            setOffer(o);
        }
        fetchData();
    }, [id])
    return (
        <div className="center-offer">
            <div className="offer">
                <AboutOffer
                    title = {offer.title}
                    categories = {offer.categories}
                    cost = {offer.cost}
                    description = {offer.description}
                    prerequisites = {offer.prerequisites}
                    location = {offer.location}
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