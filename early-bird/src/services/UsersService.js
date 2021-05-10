import axios from "axios";

async function GetUserById(id) {
  let path = sessionStorage.getItem("server") + "/api/users/"+id;
  try {
    let response = await axios.get(path, {
      headers: {"Authorization":"Bearer "+localStorage.getItem("jwt")}
    });
    return response.data;
  } catch  {
    console.log("Error");
  }
}

export {GetUserById};