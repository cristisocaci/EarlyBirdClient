import "./Offers.scss";
import AboutOffer from "./about-offer/AboutOffer";
import {GetOfferById} from "../../services/OffersService";
import {GetRole, GetUserId} from "../../services/AccountService";

import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function Offers(){
    let {id} = useParams();
    let role = GetRole();

    const [offer, setOffer] = useState({});

    useEffect(async ()=>{
        let o = await GetOfferById(id);
        if (role === "publisher" && o.publisherId !== GetUserId())
            window.location.href = '/home'
        if (role === "admin") role = "publisher";
        
        o.categories = o.categories.map(x=>x.category)
        setOffer(o);
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
            </div>
        </div>
    );
}

export default Offers;