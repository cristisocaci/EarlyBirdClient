import "./Offers.scss";
import AboutOffer from "./about-offer/AboutOffer";
import {GetOfferById} from "../../services/OffersService";

import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function Offers(){
    let {id} = useParams();
    const [offer, setOffer] = useState({});

    useEffect(async ()=>{
        let o = await GetOfferById(id);
        o.categories = o.categories.map(x=>x.category)
        setOffer(o);
    }, [id])
    return (
        <div>
            <AboutOffer
                title = {offer.title}
                categories = {offer.categories}
                cost = {offer.cost}
                description = {offer.description}
                prerequisites = {offer.prerequisites}
                location = {offer.location}
            />
        </div>
    );
}

export default Offers;