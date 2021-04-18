import axios from "axios";

async function Login(username, password) {
  let path = sessionStorage.getItem("server") + "/api/Login";
  try {
    let response = await axios.post(path, {
      username: username,
      password: password,
    });
    console.log("cusescc");
    localStorage.setItem("jwt", response.data["token"]);
    return true; 
  } catch  {
    return false;
  }
}

export { Login };