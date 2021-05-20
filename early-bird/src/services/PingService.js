import axios from "axios";

export function pingAPI() {
    let path = sessionStorage.getItem("server") + "/api/ping";
    try {
        axios.get(path);
    } catch {
    }
}
