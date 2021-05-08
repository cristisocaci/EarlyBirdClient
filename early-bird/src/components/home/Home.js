import "./Home.scss";
import Hello from "./hello/Hello";
import FilterAndSort from "./filter-and-sort/FilterAndSort";
import {GetFirstName, GetRole} from "../../services/AccountService";

import {useState} from "react";
import NewOffer from "./new-offer/NewOffer";

function Home(){
    const [offers, setOffers] = useState([]);
    const [open, setOpen] = useState(false);

    function openDialog(){
        setOpen(true);
    }
    if(offers == null);
    let name = GetFirstName();
    let role = GetRole();
    if (role === "admin") role = "worker";
    return(
        <div className="home-center">
            <div className="home-top">
                <Hello name={name} role={role}></Hello>
                {function(){
                    return role === "worker"
                    ? <FilterAndSort setOffers={setOffers}></FilterAndSort>
                    : <div className="home-publish-btn-div">
                        <button className="bg-red text-white round btn-hover home-publish-btn" onClick={openDialog}>Publish a new offer</button>
                        </div>
                }()}
            </div>
            <NewOffer open={open} setOpen={setOpen}></NewOffer>
        </div>
    );
}

export default Home;