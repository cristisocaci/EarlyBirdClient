import axios from "axios";

async function GetAllOffers(queryParams, offerStatus = 1) {
    if(offerStatus !== null)
        queryParams.offerStatus = offerStatus;
    let path = sessionStorage.getItem("server") + "/api/offers";
    try {
        let response = await axios.get(path, {
            headers: {"Authorization":"Bearer "+localStorage.getItem("jwt")},
            params:queryParams
        });
        return response.data;
    } catch {
        console.log("Error");
    }
}

async function GetOfferById(id){
    let path = sessionStorage.getItem("server") + "/api/offers/" + id;
    try {
        let response = await axios.get(path, {
            headers: {"Authorization":"Bearer "+localStorage.getItem("jwt")},
        });
        return response.data;
    } catch {
        console.log("Error");
    }
}

async function AddNewOffer(){
    let path = sessionStorage.getItem("server") + "/api/offers";
    let data = 1;
    try {
        let response = await axios.put(path, data, {
            headers: {"Authorization":"Bearer " + localStorage.getItem("jwt")}
        })
    }
    catch{

    }
}

export { GetAllOffers, GetOfferById };
