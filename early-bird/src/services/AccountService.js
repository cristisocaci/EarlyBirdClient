import axios from "axios";
import jwt_decode from "jwt-decode";

async function Login(username, password) {
  let path = sessionStorage.getItem("server") + "/api/Login";
  try {
    let response = await axios.post(path, {
      username: username,
      password: password,
    });
    localStorage.setItem("jwt", response.data["token"]);
    return true; 
  } catch  {
    return false;
  }
}

function IsUserLoggedIn(){
  let jwt = localStorage.getItem("jwt");
  if(jwt === null)
    return false;
  return true;

  // the below code is used to check expiration date
  // let jwtDecoded = jwt_decode(jwt);
  // let isExpired = jwtDecoded.exp < new Date().getTime();
  // return !isExpired;
}


function GetRole(){
  let jwt = jwt_decode(localStorage.getItem("jwt"));
  console.log(jwt);
  if(jwt === null)
    return null;
  if(jwt.Admin === "true")
    return "admin"
  if(jwt.Worker === "true")
    return "worker"
  if(jwt.Publisher === "true")
    return "publisher"
  return null;
}

async function GetUserName(){
  let jwt = jwt_decode(localStorage.getItem("jwt"));
  if(jwt == null) return null;
  return jwt.userName;
}

export { Login, IsUserLoggedIn, GetRole, GetUserName };
