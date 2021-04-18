import "./FilterAndSort.scss";
import React from "react";
import 'react-dropdown/style.css';
import arrowClosed from "../../../illustrations/filter-and-sort/arrow-closed.svg";
import {GetAllUsers} from "../../../services/OffersService.js";

function FilterAndSort(){
    const options = [
        'one', 'two', 'three'
      ];

    return(
        <div>
            <div className="fas-search">
                <input className="form-control fas-input"></input>
                <button className="bg-red text-white round py-2 px-4">Search Offers</button>
            </div>
            <div className="fas-filter-sort">

            </div>
        </div>
    );
}

export default FilterAndSort;