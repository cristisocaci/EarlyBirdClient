import "./FilterAndSort.scss";
import { React, useState } from "react";
import { GetAllUsers } from "../../../services/OffersService.js";
import FilterDropdown from "./filter-dropdown/FilterDropdown";
import SortDropdown from "./sort-dropdown/SortDropdown";


function FilterAndSort() {
    const cities = ["Mojo", "Lubei"];
    const [query, setQuery] = useState({});
    return (
        <div className="fas">
            <div className="fas-filter">
                <div className="fas-search">
                    <input className="form-control fas-input"></input>
                </div>
                <div className="dropdowns">
                    <div className="pos-relative">
                        <FilterDropdown></FilterDropdown>
                    </div>
                    <div className="pos-relative">
                        <SortDropdown></SortDropdown>
                    </div>
                </div>
            </div>
            <div className="fas-button">
                <button className="bg-red text-white round py-2 px-4">Search Offers</button>
            </div>
        </div>
    );
}

export default FilterAndSort;