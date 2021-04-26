import "./RegisterPage.scss";
import logo from "../../illustrations/Saly-register-page.svg";
import { Register } from "../../services/AccountService.js";
import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

function RegisterPage() {
  const [role, setRole] = useState("worker");
  const [textValue, setTextValue] = useState("");
  const [errorFlags, setErrorFlag] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const[usernameError, setUsernameError] = useState("Cannot be empty!")
  function enterSubmit(event) {
    if (event.code === "Enter" || event.code === "NumpadEnter")
      window.location.href = "/main";
  }
  function setFlag(index){
    let flags = [...errorFlags];
    flags[index] = true;
    setErrorFlag(flags);
  }

  function resetFlags(){
    let flags = [
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    setErrorFlag(flags);
  }
  function validateEmail(email){
    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      setFlag(3);
      return false;
    }
    return true;
  }
  function validatePasswordFields(password, confirmPassword) {
    if (password == ''){
      setFlag(4)
      return false;
    }
    if (password != confirmPassword) {
      setFlag(5)
      return false;
    }
    return true;
  }
  function validateAllFields(fields){
    if(
    validatePasswordFields(fields.password, fields.confirmPassword) &&
    validateEmail(fields.email)
    ) return true;
    return false;
  }
  async function register() {
    resetFlags();
    let firstname = document.getElementById("register-firstname").value;
    let lastname = document.getElementById("register-lastname").value;
    let email = document.getElementById("register-email").value;
    let username = document.getElementById("register-username").value;
    let password = document.getElementById("register-password").value;
    let confirmPassword = document.getElementById("register-confirm-password")
      .value;
    let roleId = role === "worker" ? 2 : 3;
    let success =  validateAllFields({
      password: password,
      confirmPassword: confirmPassword
    });
   
    if(!success) return;
    let [message, isRegisteredSuccesfully] = await Register(
      username,
      password,
      firstname,
      lastname,
      email,
      roleId
    );
    if (!isRegisteredSuccesfully && message !== ''){
      setUsernameError(message);
      setFlag(3);
    }
    //if (isRegisteredSuccesfully) window.location.href = "/home";
  }
  return (
    <div className="center-register-page">
      <div className="register-page-div row">
        <div id="forms-container" className="mr-3 mr-sm-0 col-12 col-md-8">
          <h3 className="register-text-title text-bold">Register</h3>
          <div className="forms">
            <TextField
              required 
              id="register-firstname"
              label="First Name"
              variant="outlined"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              className="form-test"
              error={errorFlags[0]}
              helperText={errorFlags[0] ? "Passwords must be the same!" : " "}
            />

            <TextField
              required 
              id="register-lastname"
              label="Last Name"
              variant="outlined"
              className="form-test"
              error={errorFlags[1]}
              helperText={errorFlags[1] ? "Cannot be empty!" : " "}
            />

            <TextField
              required
              id="register-email"
              label="Email"
              variant="outlined"
              className="form-test"
              error={errorFlags[2]}
              helperText={errorFlags[2] ? "Cannot be empty!" : " "}
            />

            <TextField
              required
              id="register-username"
              label="Username"
              variant="outlined"
              className="form-test"
              error={errorFlags[3]}
              helperText={errorFlags[3] ? usernameError : " "}
            />

            <TextField
              required
              id="register-password"
              label="Password"
              variant="outlined"
              className="form-test"
              type="password"
              error={errorFlags[4]}
              helperText={errorFlags[4] ? "Cannot be empty!" : " "}
            />

            <TextField
              required
              id="register-confirm-password"
              label="Confirm Password"
              className="form-test"
              type="password"
              variant="outlined"
              error={errorFlags[5]}
              helperText={errorFlags[5] ? "Passwords must be the same!" : " "}
            />
          </div>

          <FormControl component="fieldset">
            <RadioGroup
              aria-label="role"
              name="role1"
              value={role}
              onChange={(event) => {
                setRole(event.target.value);
              }}
            >
              <div className="register-role-option">
                <FormControlLabel value="worker" control={<Radio />} />
                <div>
                  <h4 className="role-title text-bold">Become a Worker</h4>
                  <p className="register-radio-text text-bold">
                    Make better use of your time and earn some money 💰
                  </p>
                </div>
              </div>

              <div className="register-role-option">
                <FormControlLabel value="publisher" control={<Radio />} />
                <div>
                  <h4 className="role-title text-bold">Become a Publisher</h4>
                  <p className="register-radio-text text-bold">
                    Create opportunities for the ones who want to earn 📌
                  </p>
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
