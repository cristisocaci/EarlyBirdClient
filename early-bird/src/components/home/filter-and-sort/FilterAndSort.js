import "./FilterAndSort.scss";
import { React, useEffect, useState } from "react";
import { GetAllOffers } from "../../../services/OffersService.js";
import FilterDropdown from "./filter-dropdown/FilterDropdown";
import SortDropdown from "./sort-dropdown/SortDropdown";
import {GetAllCategories } from "../../../services/CategoriesService.js";

import {useDispatch} from 'react-redux';
import {startLoader, stopLoader} from '../../../redux/actions';


function FilterAndSort(props) {
    const [query, setQuery] = useState({});
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();

    function saveText(event) {
        let q = Object.assign({}, query);
        q.text = event.target.value;
        setQuery(q);
    }
    async function getOffers(){
        dispatch(startLoader());
        let offers = await GetAllOffers(query);
        props.setOffers(offers);
        dispatch(stopLoader());
    }

    useEffect(()=>{
        async function fetchData(){
            let value = await GetAllCategories();
            setCategories(value);
        }
        fetchData();
        }, [query])


    return (
        <div className="fas">
            <div className="fas-filter">
                <div className="fas-search">
                    <input className="form-control fas-input" onChange={saveText}></input>
                </div>
                <div className="dropdowns">
                    <div className="pos-relative">
                        <FilterDropdown setQuery={setQuery} query={query} categories={categories}></FilterDropdown>
                    </div>
                    <div className="pos-relative">
                        <SortDropdown setQuery={setQuery} query={query}></SortDropdown>
                    </div>
                </div>
            </div>
            <div className="fas-button">
                <button className="bg-red text-white round py-2 px-4 btn-hover" onClick={getOffers}>Search Offers</button>
            </div>
        </div>
    );
}

export default FilterAndSort;