import "./Offers.scss";
import AboutOffer from "./about-offer/AboutOffer";
import {GetAllOffers} from "../../services/OffersService";

import {useParams} from "react-router-dom";
import {useEffect} from "react";

function Offers(){
    let {id} = useParams();
    
    useEffect(async ()=>{
        console.log(await GetAllOffers({}, null));
    }, [])
    return (
        <div>
            <AboutOffer
            />
        </div>
    );
}

export default Offers;