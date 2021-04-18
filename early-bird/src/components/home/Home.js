import "./Home.scss";
import Hello from "./hello/Hello";
import FilterAndSort from "./filter-and-sort/FilterAndSort";

import {useState} from "react";

function Home(){
    const [offers, setOffers] = useState([]);
    return(
        <div>
            <Hello name="Cristian" role="worker"></Hello>
            <FilterAndSort setOffers={setOffers}></FilterAndSort>
            <p style={{marginTop:"5em"}}>asd</p>
        </div>
    );
}

export default Home;