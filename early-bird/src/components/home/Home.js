import "./Home.scss";
import Hello from "./hello/Hello";
import FilterAndSort from "./filter-and-sort/FilterAndSort";
import DisplayOffers from "./display-offers/DisplayOffers";
import { GetFirstNameFromDb, GetRole } from "../../services/AccountService";
import { GetAllOffers } from "../../services/OffersService";

import { useState, useEffect } from "react";

function Home() {
  const [offers, setOffers] = useState([]);
  const [name, setName] = useState("");

  let role = GetRole();
  if (role === "admin") role = "worker";

  useEffect(() => {
    GetFirstNameFromDb().then((result) => {
      setName(result);
    });
    GetAllOffers({ filterByCurrentUser: role === "publisher" }, null).then(
      (result) => {
        setOffers(result);
      }
    );
  }, [role]);

  return (
    <div className="home-center">
      <div className="home-top">
        <Hello name={name} role={role}></Hello>
        {(function () {
          return role === "worker" ? (
            <FilterAndSort setOffers={setOffers}></FilterAndSort>
          ) : (
            <div className="home-publish-btn-div">
              <button className="bg-red text-white round btn-hover home-publish-btn">
                Publish a new offer
              </button>
            </div>
          );
        })()}
      </div>
      <DisplayOffers offers={offers}></DisplayOffers>
    </div>
  );
}

export default Home;
