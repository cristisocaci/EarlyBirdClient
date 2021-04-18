import "./SortDropdown.scss";
import arrowDown from "../../../../illustrations/filter-and-sort/arrow-down.svg";
import { useRef } from "react";

function SortDropdown(){
    let sortPressed = false;
    const sortRef = useRef();
    const btnRef = useRef();

    function toggle(event) {
        if (!sortPressed) {
            sortRef.current.style.display = "block";
            btnRef.current.style.transform = "rotate(-180deg)";
            sortPressed = true;
        }
        else if(sortPressed && !event.target.closest(".fas-sort-content")) {
            sortRef.current.style.display = "none";
            btnRef.current.style.transform = "rotate(0deg)";
            sortPressed = false;
        }
    }
    document.addEventListener("mouseup", function(event){
        if (sortPressed && 
            !event.target.closest(".fas-sort-dropdown")) {

                sortRef.current.style.display = "none";
            btnRef.current.style.transform = "rotate(0deg)";
            sortPressed = false;
        }
    });
    
    return(
        <div className="fas-sort-dropdown" onClick={toggle}>
                <div className="fas-sort-display">
                    <p className="m-0" >Sort by</p>
                    <img src={arrowDown} className="fas-icon" ref={btnRef}></img>
                </div>
                <div className="fas-sort-content"  ref={sortRef}>
                    <div className="divider"></div>
                    
                </div>
            </div>
    );
}

export default SortDropdown;