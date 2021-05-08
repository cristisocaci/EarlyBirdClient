import "./FilterDropdown.scss";
import arrowDown from "../../../../illustrations/filter-and-sort/arrow-down.svg";
import { useRef, useState } from "react";

function FilterDropdown(props) {
    let filterPressed = false;
    const filterRef = useRef();
    const btnRef = useRef();
    const catRefs = useRef(new Array());

    const [catPressed, setCatPressed] = useState([]);

    function togglePressed(index) {
        if (!catPressed[index])
            catRefs.current[index].style.border = "1px solid red"
        else
            catRefs.current[index].style.border = "none"
        let aux = [...catPressed];
        aux[index] = !aux[index];
        setCatPressed(aux);

        let q = Object.assign({}, props.query);
        let ids = [];
        for (let i = 0; i < aux.length; ++i) {
            if (aux[i])
                ids.push(props.categories[i].id)
        }
        q.categoryIds = ids;
        props.setQuery(q);
    }

    function toggle(event) {
        if (!filterPressed) {
            filterRef.current.style.display = "block";
            btnRef.current.style.transform = "rotate(-180deg)";
            filterPressed = true;
        }
        else if (filterPressed && !event.target.closest(".fas-filter-content")) {
            filterRef.current.style.display = "none";
            btnRef.current.style.transform = "rotate(0deg)";
            filterPressed = false;
        }
    }
    document.addEventListener("mouseup", function (event) {
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

    function renderCategories() {
        if (props.categories) {
            return <div>
            {props.categories.map((x, index) =>
                <button key={index}
                    onClick={() => togglePressed(index)}
                    ref={element => catRefs.current.push(element)}>
                    {x.name}
                </button>)}
            </div>
        }
    }

    return (
        <div className="fas-filter-dropdown" onClick={toggle}>
            <div className="fas-dropdown-display">
                <p className="m-0" >Filter by</p>
                <img src={arrowDown} className="fas-icon" ref={btnRef}></img>
            </div>
            <div className="fas-filter-content" ref={filterRef}>
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
                <div className="fas-filter-btn round mb-2 py-2 px-3">
                    <div className="fas-btn-text">
                        Category
                        </div>
                    <div className="fas-btn-elem">
                        {renderCategories()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterDropdown;