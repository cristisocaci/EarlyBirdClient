import "./FilterAndSort.scss";
import { React, useState} from "react";
import { GetAllUsers } from "../../../services/OffersService.js";
import FilterDropdown from "./filter-dropdown/FilterDropdown";


function FilterAndSort() {
    const cities = ["Mojo", "Lubei"];
    const [query, setQuery] = useState({});

    return (
        <div>
            <div className="fas-search">
                <input className="form-control fas-input"></input>
                <button className="bg-red text-white round py-2 px-4">Search Offers</button>
            </div>
            <FilterDropdown></FilterDropdown>

        </div>
    );
}

export default FilterAndSort;