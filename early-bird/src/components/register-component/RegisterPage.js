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
  let errorFlagsAux = [...errorFlags];
  const [usernameError, setUsernameError] = useState("Cannot be empty!");
  function enterSubmit(event) {
    if (event.code === "Enter" || event.code === "NumpadEnter")
      register();
  }
  function setFlag(index) {
    errorFlagsAux[index] = true;
    setErrorFlag(errorFlagsAux);
  }
  function setFlags(indexList) {
    indexList.forEach((index) => {
      if (index !== null) errorFlagsAux[index] = true;
    });
    setErrorFlag(errorFlagsAux);
    
  }

  function resetFlags() {
    errorFlagsAux = [false, false, false, false, false, false];
    setErrorFlag(errorFlagsAux);
  }

  function validateFirstName(firstName) {
    if (firstName == "") {
      return 0;
    }
    return null;
  }

  function validateLastName(lastName) {
    if (lastName == "") {
      return 1;
    }
    return null;
  }

  
  function validateEmail(email) {
    if (!(email.includes(".com") && email.includes("@"))) {
      return 2;
    }
    return null;
  }

  function validateUsername(userName){
    if (userName == ""){
      return 3;
    }
    return null;
  }

  function validatePasswordFields(password, confirmPassword) {
    if (password == "") {
      return 4;
    }
    if (password != confirmPassword) {
      return 5;
    }
    return null;
  }
  function validateAllFields(fields) {
    let indexList = [
      validateFirstName(fields.firstname),
      validateLastName(fields.lastname),
      validateEmail(fields.email),
      validateUsername(fields.username),
      validatePasswordFields(fields.password, fields.confirmPassword),
    ];
    setFlags(indexList);
    return !indexList.some(x => Number.isInteger(x));
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
    let success = validateAllFields({
      firstname: firstname,
      lastname: lastname,
      email: email,
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    });

    if (!success) return;
    let [message, isRegisteredSuccesfully] = await Register(
      username,
      password,
      firstname,
      lastname,
      email,
      roleId
    );
    if (!isRegisteredSuccesfully && message !== "") {
      setUsernameError(message);
      setFlag(3);
    }
    if (isRegisteredSuccesfully) window.location.href = "/home";
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
              helperText={errorFlags[0] ? "Cannot be empty!" : " "}
              onKeyPress={enterSubmit}
            />

            <TextField
              required
              id="register-lastname"
              label="Last Name"
              variant="outlined"
              className="form-test"
              error={errorFlags[1]}
              helperText={errorFlags[1] ? "Cannot be empty!" : " "}
              onKeyPress={enterSubmit}
            />

            <TextField
              required
              id="register-email"
              label="Email"
              variant="outlined"
              className="form-test"
              error={errorFlags[2]}
              helperText={errorFlags[2] ? "Wrong email format!" : " "}
              onKeyPress={enterSubmit}
            />

            <TextField
              required
              id="register-username"
              label="Username"
              variant="outlined"
              className="form-test"
              error={errorFlags[3]}
              helperText={errorFlags[3] ? usernameError : " "}
              onKeyPress={enterSubmit}
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
              onKeyPress={enterSubmit}
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
              onKeyPress={enterSubmit}
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
