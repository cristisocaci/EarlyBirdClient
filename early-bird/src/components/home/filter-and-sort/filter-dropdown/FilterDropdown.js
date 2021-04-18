import "./FilterDropdown.scss";
import arrowDown from "../../../../illustrations/filter-and-sort/arrow-down.svg";
import { useRef } from "react";

function FilterDropdown(props){
    let filterPressed = false;
    const filterRef = useRef();
    const btnRef = useRef();

    function toggle(event) {
        if (!filterPressed) {
            filterRef.current.style.display = "block";
            btnRef.current.style.transform = "rotate(-180deg)";
            filterPressed = true;
        }
        else if(filterPressed && !event.target.closest(".fas-filter-content")) {
            filterRef.current.style.display = "none";
            btnRef.current.style.transform = "rotate(0deg)";
            filterPressed = false;
        }
    }
    document.addEventListener("mouseup", function(event){
        if (filterPressed && 
            !event.target.closest(".fas-filter-dropdown")) {

            filterRef.current.style.display = "none";
            btnRef.current.style.transform = "rotate(0deg)";
            filterPressed = false;
        }
    });

    function save(event) {
        let q = Object.assign({}, props.query);
        q[event.target.id] = event.target.value;
        props.setQuery(q);
    }

    return(
        <div className="fas-filter-dropdown" onClick={toggle}>
                <div className="fas-dropdown-display">
                    <p className="m-0" >Filter by</p>
                    <img src={arrowDown} className="fas-icon" ref={btnRef}></img>
                </div>
                <div className="fas-filter-content"  ref={filterRef}>
                    <div className="divider"></div>
                    <p>Min Cost</p>
                    <input type="number" className="form-control" onChange={save} id="minCost"></input>
                    <div className="divider"></div>
                    <p>Max Cost</p>
                    <input type="number" className="form-control" onChange={save} id="maxCost"></input>
                    <div className="divider"></div>
                    <p>City</p>
                    <input type="text" className="form-control" onChange={save} id="city"></input>
                    <div className="divider"></div>
                    <button className="fas-filter-btn round mb-2">
                        Category
                        <img src={arrowDown} className="fas-icon-btn"></img>
                    </button>
                </div>
            </div>
    )
}

export default FilterDropdown;