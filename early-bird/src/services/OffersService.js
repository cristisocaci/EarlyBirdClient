import axios from "axios";
import { GetUserId } from "./AccountService";
async function GetAllOffers(queryParams, offerStatus = 1) {
  if (offerStatus !== null) queryParams.offerStatus = offerStatus;
  let path = sessionStorage.getItem("server") + "/api/offers";
  try {
    let response = await axios.get(path, {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      params: queryParams,
    });
    return response.data;
  } catch {
    console.log("Error");
  }
}

async function GetOfferById(id) {
  let path = sessionStorage.getItem("server") + "/api/offers/" + id;
  try {
    let response = await axios.get(path, {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
    });
    return response.data;
  } catch {
    console.log("Error");
  }
}

async function AddNewOffer(title, description, cost, prerequisites, location, categoryIds) {
  let path = sessionStorage.getItem("server") + "/api/offers";
  let userId = GetUserId();
  let data = {
    title: title,
    description: description,
    cost: cost,
    status: 1,
    publisherId: userId,
    location: location,
    prerequisites: prerequisites,
    notes: "",
    categoryIds: categoryIds,
  };

  try {
        await axios.post(path, data, {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
    });
  } catch {}
}

export { GetAllOffers, GetOfferById, AddNewOffer};
