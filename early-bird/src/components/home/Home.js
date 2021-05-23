import "./Home.scss";
import noOffersIllustration from "../../illustrations/Saly-no-offers.svg"
import Hello from "./hello/Hello";
import FilterAndSort from "./filter-and-sort/FilterAndSort";
import DisplayOffers from "./display-offers/DisplayOffers";
import {GetFirstName, GetRole} from "../../services/AccountService";
import {GetAllOffers} from "../../services/OffersService"

import {useState, useEffect} from "react";
import {useDispatch} from 'react-redux';
import {startLoader, stopLoader} from '../../redux/actions';

function Home(){
    const [offers, setOffers] = useState(null);
    const dispatch = useDispatch();
    let name = GetFirstName();
    let role = GetRole();
    if (role === "admin") role = "worker";

    useEffect(() => {
        dispatch(startLoader());
        if (role === "publisher") 
            GetAllOffers({filterByCurrentUser: true}, null).then(result => {
                setOffers(result);
                dispatch(stopLoader());
            })
        else
            GetAllOffers({filterByCurrentUser: false}).then(result => {
                setOffers(result);
                dispatch(stopLoader());
            })
    }, [role, dispatch])

    function renderOffers() {
        if (offers == null) return

        return offers.length !== 0 ? 
        <DisplayOffers offers={offers} ></DisplayOffers> :
        <img className="no-offers-illustration" src={noOffersIllustration} alt="no-offers-illustration" />
    }
    return(
        <div className="home-center">
            <div className="home-top">
                <Hello name={name} role={role}></Hello>
                {function(){
                    return role === "worker"
                    ? <FilterAndSort setOffers={setOffers}></FilterAndSort>
                    : <div className="home-publish-btn-div"><button className="bg-red text-white round btn-hover home-publish-btn">Publish a new offer</button></div>
                }()}
            </div>
            {renderOffers()}
        </div>
    );
}

export default Home;