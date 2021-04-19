import axios from "axios";

async function GetAllCategories() {
    let path = sessionStorage.getItem("server") + "/api/categories";
    try {
        let response = await axios.get(path, {
            headers: {"Authorization":"Bearer "+localStorage.getItem("jwt")},
        });
        return response.data;
    } catch {
        console.log("Error");
    }
}

export { GetAllCategories };
