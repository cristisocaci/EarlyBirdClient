import axios from "axios";
import {GetUserId} from './AccountService.js'

export async function GetUserById(id) {
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

export async function Update(password, firstname, lastname) {
  let path = sessionStorage.getItem("server") + "/api/Users/" + GetUserId();
  let data = {
    firstname: firstname,
    lastname: lastname,
  }
  if (password !== "") {
    data.password = password;
  }
  try {
    await axios.put(path, data, {headers: {"Authorization":"Bearer "+localStorage.getItem("jwt")}});
    return true
  } catch (err) {
    console.log(err, err.response);
  }
}
