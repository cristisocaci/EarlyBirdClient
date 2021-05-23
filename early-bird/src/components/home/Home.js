import "./Home.scss";
import Hello from "./hello/Hello";
import FilterAndSort from "./filter-and-sort/FilterAndSort";
import DisplayOffers from "./display-offers/DisplayOffers";
import {GetFirstNameFromDb, GetRole} from "../../services/AccountService";
import {GetAllOffers} from "../../services/OffersService"
import {NewOffer} from "./new-offer/NewOffer"
import {useState, useEffect} from "react";
import {useDispatch} from 'react-redux';
import {startLoader, stopLoader} from '../../redux/actions';

function Home(){
    const [offers, setOffers] = useState([]);
    const [name, setName] = useState("");
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    function openDialog(){
        setOpen(true);
    }
    let role = GetRole();
    if (role === "admin") role = "worker";

    useEffect(() => {
        dispatch(startLoader());
        GetFirstNameFromDb().then((result) => {
            setName(result);
          });
        if (role === "publisher") 
            GetAllOffers({filterByCurrentUser: true}, null).then(result => {
                setOffers(result);
                dispatch(stopLoader());
            })
        else
            GetAllOffers({filterByCurrentUser: false}).then(result => {
                setOffers(result);
                dispatch(stopLoader());
            })
    }, [role, dispatch])

    return(
        <div className="home-center">
            <div className="home-top">
                <Hello name={name} role={role}></Hello>
                {function(){
                    return role === "worker"
                    ? <FilterAndSort setOffers={setOffers}></FilterAndSort>
                    : <div className="home-publish-btn-div">
                        <button className="bg-red text-white round btn-hover home-publish-btn" onClick={openDialog}>Publish a new offer</button>
                        </div>
                }()}
            </div>
            <NewOffer open={open} setOpen={setOpen}></NewOffer>
            <DisplayOffers offers={offers} ></DisplayOffers>
        </div>
    );
}

export default Home;
