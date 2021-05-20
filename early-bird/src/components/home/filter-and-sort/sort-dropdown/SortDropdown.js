import "./SortDropdown.scss";
import arrowDown from "../../../../illustrations/filter-and-sort/arrow-down.svg";
import { useState, useRef } from "react";

function SortDropdown(props){
    let sortPressed = false;
    const [buttonPressed, setButtonPressed] = useState([false, false, false, false])
    const sortRef = useRef();
    const btnRef = useRef();
    const choicesRef = [useRef(), useRef(), useRef(), useRef()];

    function togglePressed(index){
        for (let i = 0; i < 4; i++) {
            choicesRef[i].current.style.border = "none"
        }

        if(!buttonPressed[index])
            choicesRef[index].current.style.border = "1px solid red"

        let items = [false, false, false, false];
        items[index] = !buttonPressed[index];
        setButtonPressed(items);

        let q = Object.assign({}, props.query);
        delete q.costAscending
        delete q.titleAscending
        if(items[1]) q.titleAscending = false;
        if(items[0]) q.titleAscending = true;
        if(items[3]) q.costAscending = false;
        if(items[2]) q.costAscending = true;
        console.log(q);
        props.setQuery(q);
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
                    <img src={arrowDown} className="fas-icon" ref={btnRef} alt=""></img>
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