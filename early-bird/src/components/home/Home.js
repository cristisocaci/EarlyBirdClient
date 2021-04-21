import "./Home.scss";
import Hello from "./hello/Hello";
import FilterAndSort from "./filter-and-sort/FilterAndSort";
import {GetFirstName, GetRole, GetUserName} from "../../services/AccountService";

import {useState} from "react";

function Home(){
    const [offers, setOffers] = useState([]);
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
                    : <div className="home-publish-btn-div"><button className="bg-red text-white round btn-hover home-publish-btn">Publish a new offer</button></div>
                }()}
            </div>
        </div>
    );
}

export default Home;