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

async function AddNewOffer(title, description, cost, prerequisites, city, street, streetNumber, categoryIds) {
  let path = sessionStorage.getItem("server") + "/api/offers";
  let userId = GetUserId();
  let location = {
    cityName: city,
    streetName: street,
    streetNumber: streetNumber,
  };
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
    let response = await axios.put(path, data, {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
    });
  } catch {}
}

export { GetAllOffers, GetOfferById };
