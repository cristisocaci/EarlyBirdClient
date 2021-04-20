import "./RegisterPage.scss";
import logo from "../../illustrations/Saly-register-page.svg";
import { Register } from "../../services/AccountService.js";
// import { useState } from "react";

function RegisterPage() {
  function enterSubmit(event) {
    if (event.code === "Enter" || event.code === "NumpadEnter")
      window.location.href = "/main";
  }

  async function register() {
    let username = document.getElementById("register-username").value;
    let firstname = document.getElementById("register-firstname").value;
    let lastname = document.getElementById("register-lastname").value;
    let password = document.getElementById("register-password").value;
    let isRegistered = await Register(username, password, firstname, lastname, 1);
    if(isRegistered)
      window.location.href = "/main"
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

          <div className="role-checker">
           
              <div>
                <input
                  type="radio"
                  id="worker"
                  className="register-radio"
                  name="role"
                  value="worker"
                ></input>
              </div>
              <div>
                <h3 className="radio-role">Become a Worker</h3>
                <p className="radio-role">
                  Make better use of your time and earn some money 💰
                </p>
              </div>


            <div className="radio-button">
              <div>
                <input
                  type="radio"
                  id="publisher"
                  className="register-radio"
                  name="role"
                  value="publisher"
                ></input>
              </div>

              <div>
                <h3 className="radio-role">Become a Publisher</h3>
                <p className="radio-role">
                  Create opportunities for the ones who want to earn 📌
                </p>
              </div>
            </div>
          </div>

          <button className="register-button round bg-red text-bold text-white" onClick={register}>
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
