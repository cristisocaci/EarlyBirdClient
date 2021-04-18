import "./FilterDropdown.scss";
import arrowDown from "../../../../illustrations/filter-and-sort/arrow-down.svg";
import { useRef } from "react";

function FilterDropdown(){
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
    
    return(
        <div className="fas-filter-dropdown" onClick={toggle}>
                <div className="fas-dropdown-display">
                    <p className="m-0" >Filter by</p>
                    <img src={arrowDown} className="fas-icon" ref={btnRef}></img>
                </div>
                <div className="fas-filter-content"  ref={filterRef}>
                    <div className="divider"></div>
                    <p>Min Cost</p>
                    <input type="number" className="form-control"></input>
                    <div className="divider"></div>
                    <p>Max Cost</p>
                    <input type="number" className="form-control"></input>
                    <div className="divider"></div>
                    <button className="fas-filter-btn round">
                        City
                        <img src={arrowDown} className="fas-icon-btn"></img>
                    </button>
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