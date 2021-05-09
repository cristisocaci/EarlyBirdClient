import "./LoginPage.scss";
import logo from "../../illustrations/Saly-login-page.svg";
import { Login } from "../../services/AccountService.js";
import { useState } from "react";
import {useHistory} from 'react-router-dom';

function LoginPage() {
  const [fail, setFail] = useState(false);
  const history = useHistory();
  async function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let isLoggedIn = await Login(username, password);
    if(isLoggedIn)
      history.push("/home");
    else
      setFail(true);
  }

  function validCredentials() {
    if (fail)
      return <p className="invalid-login text-bold mt-3">Wrong Credentials!</p>;
  }

  function enterSubmit(event){
      if(event.code === "Enter" || event.code === "NumpadEnter")
        login();
  }
  

  return (
    <div className="center-login-page">
      <div className="login-page-div row">
        <div id="right-text" className="mr-3 mr-sm-0 col-12 col-md-6">
          <h1 id="login-title" className="mb-4">
            Welcome back!
          </h1>
          <div className="login-first-form">
            <p className="text-bold">Username</p>
            <input
              id="username"
              className="login-form form-control"
              type="text"
              onKeyPress={enterSubmit}
            ></input>
          </div>
          <div className="login-first-form">
            <p className="text-bold">Password</p>
            <input
              id="password"
              className="login-form form-control"
              type="password"
              onKeyPress={enterSubmit}
            ></input>
          </div>
          <button
            className="login-button round bg-red text-bold text-white btn-hover"
            onClick={login}
          >
            Log In
          </button>

          {validCredentials()}
        </div>
        <div id="logo-div" className="d-none d-md-flex col-0 col-md-6">
          <img className="logo" src={logo} alt=""></img>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
