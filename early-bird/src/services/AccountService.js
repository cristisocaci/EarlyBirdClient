import axios from "axios";
import jwt_decode from "jwt-decode";
import {GetUserById} from './UsersService';
export async function Login(username, password) {
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

export async function Register(username, password, firstname, lastname, email, role) {
  let path = sessionStorage.getItem("server") + "/api/Register";
  try {
    let response = await axios.post(path, {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      email: email,
      role: role
    });
    localStorage.setItem("jwt", response.data["token"]);
    return ['', true]; 
  } catch (err) {
    console.log(err, err.response);
    if(err.response.status === 403)
      return ['User already existing!', false];
      
    return ['Cannot be empty!', false];
  }
}

export function IsUserLoggedIn(){
  let jwt = localStorage.getItem("jwt");
  if(jwt === null)
    return false;
  return true;

  // the below code is used to check expiration date
  // let jwtDecoded = jwt_decode(jwt);
  // let isExpired = jwtDecoded.exp < new Date().getTime();
  // return !isExpired;
}


export function GetRole(){
  let jwt = DecodeJwt()
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

export function GetUserName(){
  let jwt = DecodeJwt()
  return jwt.userName;
}

export function GetUserId(){
  let jwt = DecodeJwt()
  return jwt.sub;
}

export async function GetFirstNameFromDb(){
  let user = await GetUserById(GetUserId())
  return user.firstname;
}

export async function GetLastNameFromDb(){
  let user = await GetUserById(GetUserId())
  return user.lastname;
}
export function GetFirstName(){
  let jwt = DecodeJwt()
  return jwt.firstName;
}
export function DecodeJwt(){
  return jwt_decode(localStorage.getItem("jwt"));
}

