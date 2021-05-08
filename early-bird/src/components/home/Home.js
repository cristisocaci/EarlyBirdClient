import "./Home.scss";
import Hello from "./hello/Hello";
import FilterAndSort from "./filter-and-sort/FilterAndSort";
import DisplayOffers from "./display-offers/DisplayOffers";

import {useState, useEffect} from "react";

function Home(){
    const [offers, setOffers] = useState([]);
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


    

    return(
        <div className="home-center">
            <div className="home-top">
                <Hello name="Cristian" role="worker"></Hello>
                <FilterAndSort setOffers={setOffers}></FilterAndSort>
            </div>
            <DisplayOffers offers={offers} ></DisplayOffers>
        </div>
    );
}

export default Home;