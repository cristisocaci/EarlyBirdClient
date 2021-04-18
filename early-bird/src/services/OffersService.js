import axios from "axios";

async function GetAllOffers(queryParams, offerStatus = 1) {
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

export { GetAllOffers };
