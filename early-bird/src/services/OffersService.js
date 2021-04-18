import axios from "axios";

async function GetAllUsers(queryParams) {
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

export { GetAllUsers };
