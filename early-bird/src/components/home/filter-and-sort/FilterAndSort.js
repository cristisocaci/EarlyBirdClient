import "./FilterAndSort.scss";
import { React, useState, useRef } from "react";
import arrowClosed from "../../../illustrations/filter-and-sort/arrow-closed.svg";
import { GetAllUsers } from "../../../services/OffersService.js";



function FilterAndSort() {
    const Cities = ["Cluj", "Bucuresti", "Oradea"];
    GetAllUsers({cities: Cities});
    const [query, setQuery] = useState({});
    let filterPressed = false;
    const filterRef = useRef();

    function toggle(event) {
        if (!filterPressed) {
            filterRef.current.style.display = "block";
            filterPressed = true;
        }
        else if(filterPressed && !event.target.closest(".fas-filter-content")) {
            filterRef.current.style.display = "none";
            filterPressed = false;
        }
    }
    document.addEventListener("mouseup", function(event){
        if (filterPressed && 
            !event.target.closest(".fas-filter-dropdown")) {

            filterRef.current.style.display = "none";
            filterPressed = false;
        }
    });
    
    return (
        <div>
            <div className="fas-search">
                <input className="form-control fas-input"></input>
                <button className="bg-red text-white round py-2 px-4">Search Offers</button>
            </div>
            <div className="fas-filter-dropdown" onClick={toggle}>
                <div className="fas-dropdown-display">
                    <p className="m-0" >Filter by</p>
                    <img src={arrowClosed} className="fas-icon"></img>
                </div>
                <div className="fas-filter-content"  ref={filterRef}>
                <div className="divider"></div>
                    <p>Min Cost</p>
                    <input type="number" className="form-control"></input>
                    <div className="divider"></div>
                    <p>Max Cost</p>
                    <input type="number" className="form-control"></input>
                    <div className="divider"></div>
                    <p>ddd</p>
                </div>
            </div>

        </div>
    );
}

export default FilterAndSort;