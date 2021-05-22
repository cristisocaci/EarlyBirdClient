import axios from "axios";

async function GetConversations() {
    let path = sessionStorage.getItem("server") + "/api/chat/conversations";
    try {
        let response = await axios.get(path, {
          headers: {"Authorization":"Bearer "+localStorage.getItem("jwt")}
        });
        return response.data;
    } catch  {
      console.log("Error");
    }
  }

  export {GetConversations};