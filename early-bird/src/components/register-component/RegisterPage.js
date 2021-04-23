import "./RegisterPage.scss";
import logo from "../../illustrations/Saly-register-page.svg";
import { Register } from "../../services/AccountService.js";
import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

function RegisterPage() {

  const [role, setRole] = useState('worker');
  function enterSubmit(event) {
    if (event.code === "Enter" || event.code === "NumpadEnter")
      window.location.href = "/main";
  }

  async function register() {
    let username = document.getElementById("register-username").value;
    let firstname = document.getElementById("register-firstname").value;
    let lastname = document.getElementById("register-lastname").value;
    let email = document.getElementById("register-email").value;
    let password = document.getElementById("register-password").value;
    let roleId = role === 'worker' ? 2 : 3;

    let isRegisteredSuccesfully = await Register(
      username,
      password,
      firstname,
      lastname,
      email,
      roleId
    );
     //if (isRegisteredSuccesfully) window.location.href = "/home";
  }

 
  return (
    <div className="center-register-page">
      <div className="register-page-div row">
        <div id="forms-container" className="mr-3 mr-sm-0 col-12 col-md-8">
          <div className="forms">
            <div>
              <p className="text-bold">First Name</p>

              <input
                id="register-firstname"
                className="login-form form-control"
                type="text"
                onKeyPress={enterSubmit}
              ></input>
            </div>

            <div>
              <p className="text-bold">Last Name</p>
              <input
                id="register-lastname"
                className="login-form form-control"
                type="text"
                onKeyPress={enterSubmit}
              ></input>
            </div>

            <div>
              <p className="text-bold">Email</p>

              <input
                id="register-email"
                className="login-form form-control"
                type="text"
                onKeyPress={enterSubmit}
              ></input>
            </div>

            <div>
              <p className="text-bold">Username</p>

              <input
                id="register-username"
                className="login-form form-control"
                type="text"
                onKeyPress={enterSubmit}
              ></input>
            </div>

            <div>
              <p className="text-bold">Password</p>
              <input
                id="register-password"
                className="login-form form-control"
                type="password"
                onKeyPress={enterSubmit}
              ></input>
            </div>

            <div>
              <p className="text-bold">Confirm Password</p>
              <input
                id="register-password"
                className="login-form form-control"
                type="password"
                onKeyPress={enterSubmit}
              ></input>
            </div>
          </div>

          <FormControl component="fieldset">
            <RadioGroup
              aria-label="role"
              name="role1"
              value={role}
              onChange={event => {
                setRole(event.target.value);
              }}
            >
              <div className="register-role-option">
                <FormControlLabel value='worker' control={<Radio />} />
                <div>
                  <h4 className="role-title text-bold">Become a Worker</h4>
                  <p className="register-radio-text text-bold">Make better use of your time and earn some money 💰</p>
                </div>
                
              </div>

              <div className="register-role-option">
                <FormControlLabel value='publisher' control={<Radio />} />
                <div>
                  <h4 className="role-title text-bold">Become a Publisher</h4>
                  <p className="register-radio-text text-bold">Create opportunities for the ones who want to earn 📌</p>
                </div>
              </div>
            </RadioGroup>
          </FormControl>

          <button
            className="register-button round bg-red text-bold text-white"
            onClick={register}
          >
            Sign Up
          </button>
        </div>
        <div id="register-logo-div" className="d-none d-md-flex col-0 col-md-4">
          <img className="register-page-logo" src={logo}></img>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
