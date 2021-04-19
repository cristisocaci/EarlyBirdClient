import "./Home.scss";
import Hello from "./hello/Hello";
import FilterAndSort from "./filter-and-sort/FilterAndSort";
import DisplayOffers from "./display-offers/DisplayOffers";

import {useState} from "react";

function Home(){
    const [offers, setOffers] = useState([]);
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

    return(
        <div onLoad={() => setOffers(data)}>
            <Hello name="Cristian" role="worker"></Hello>
            <FilterAndSort setOffers={setOffers}></FilterAndSort>
            <DisplayOffers offers={offers} onLoad={() => setOffers(data)}></DisplayOffers>
            <button onClick={() => setOffers(data)}>Set Offers</button>
        </div>
    );
}

export default Home;