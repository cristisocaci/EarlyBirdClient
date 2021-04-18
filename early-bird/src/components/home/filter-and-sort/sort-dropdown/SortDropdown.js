import "./SortDropdown.scss";
import arrowDown from "../../../../illustrations/filter-and-sort/arrow-down.svg";
import { useState, useRef } from "react";

function SortDropdown(){
    let sortPressed = false;
    const [buttonPressed, setButtonPressed] = useState([false,false, false, false])
    const sortRef = useRef();
    const btnRef = useRef();
    const choicesRef = [useRef(), useRef(), useRef(), useRef()];

    function togglePressed(index){
        if(!buttonPressed[index])
            choicesRef[index].current.style.border = "1px solid red"
        else
            choicesRef[index].current.style.border = "none"

        let items = [...buttonPressed];
        items[index] = !items[index];
        setButtonPressed(items);
    }

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
                    <button onClick={()=>togglePressed(0)} ref={choicesRef[0]}>Title A-Z</button>
                    <button onClick={()=>togglePressed(1)} ref={choicesRef[1]}>Title Z-A</button>
                    <button onClick={()=>togglePressed(2)} ref={choicesRef[2]}>Price ascending</button>
                    <button onClick={()=>togglePressed(3)} ref={choicesRef[3]}>Price decending </button>
                </div>
            </div>
    );
}

export default SortDropdown;