import "./FilterAndSort.scss";
import { React, useState } from "react";
import { GetAllOffers } from "../../../services/OffersService.js";
import FilterDropdown from "./filter-dropdown/FilterDropdown";
import SortDropdown from "./sort-dropdown/SortDropdown";


function FilterAndSort(props) {
    const cities = ["Mojo", "Lubei"];
    const [query, setQuery] = useState({});

    function saveText(event) {
        let q = Object.assign({}, query);
        q.text = event.target.value;
        setQuery(q);
    }
    async function getOffers(){
        console.log(query);
        let offers = await GetAllOffers(query);
        props.setOffers(offers);
        console.log(offers);
    }

    return (
        <div className="fas">
            <div className="fas-filter">
                <div className="fas-search">
                    <input className="form-control fas-input" onChange={saveText}></input>
                </div>
                <div className="dropdowns">
                    <div className="pos-relative">
                        <FilterDropdown setQuery={setQuery} query={query}></FilterDropdown>
                    </div>
                    <div className="pos-relative">
                        <SortDropdown setQuery={setQuery}></SortDropdown>
                    </div>
                </div>
            </div>
            <div className="fas-button">
                <button className="bg-red text-white round py-2 px-4" onClick={getOffers}>Search Offers</button>
            </div>
        </div>
    );
}

export default FilterAndSort;