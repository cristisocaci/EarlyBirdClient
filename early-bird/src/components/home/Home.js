import "./Home.scss";
import Hello from "./hello/Hello";
import FilterAndSort from "./filter-and-sort/FilterAndSort";
<<<<<<< HEAD
import DisplayOffers from "./display-offers/DisplayOffers";
=======
import {GetFirstName, GetRole} from "../../services/AccountService";
>>>>>>> 84751e077cb055014de814173896aded1b8cc279

import {useState, useEffect} from "react";

function Home(){
    const [offers, setOffers] = useState([]);
<<<<<<< HEAD
    useEffect(() => {
        let data = [
            {
                title: "Mow the lawn",
                publisher: {
                    firstName: "Flaviu",
                    lastName: "Raita"
                },
                cost: 500,
                categories: ["Outdoor", "Easy Money"]
            },
            {
                title: "Mow the lawn",
                publisher: {
                    firstName: "Flaviu",
                    lastName: "Raita"
                },
                cost: 500,
                categories: ["Outdoor", "Easy Money"]
            },
            {
                title: "Mow the lawn",
                publisher: {
                    firstName: "Flaviu",
                    lastName: "Raita"
                },
                cost: 500,
                categories: ["Outdoor", "Easy Money"]
            },
            {
                title: "Mow the lawn",
                publisher: {
                    firstName: "Flaviu",
                    lastName: "Raita"
                },
                cost: 500,
                categories: ["Outdoor", "Easy Money"]
            },
            {
                title: "Mow the lawn",
                publisher: {
                    firstName: "Flaviu",
                    lastName: "Raita"
                },
                cost: 500,
                categories: ["Outdoor", "Easy Money"]
            },
            {
                title: "Mow the lawn",
                publisher: {
                    firstName: "Flaviu",
                    lastName: "Raita"
                },
                cost: 500,
                categories: ["Outdoor", "Easy Money"]
            }
        ]
        setOffers(data);
    }, [])


    

=======
    if(offers == null);
    let name = GetFirstName();
    let role = GetRole();
    if (role === "admin") role = "worker";
>>>>>>> 84751e077cb055014de814173896aded1b8cc279
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
            <DisplayOffers offers={offers} ></DisplayOffers>
        </div>
    );
}

export default Home;