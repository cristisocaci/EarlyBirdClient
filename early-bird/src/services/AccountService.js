import axios from "axios";

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


async function Register(username, password, firstname, lastname, email, role) {
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
    return true; 
  } catch  {
    return false;
  }
}

export { Login, Register };
