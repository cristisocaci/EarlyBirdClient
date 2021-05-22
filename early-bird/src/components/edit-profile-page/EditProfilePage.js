import React from "react";
import "./EditProfilePage.scss";
import editLogo from "../../illustrations/Saly-edit-profile-page.svg";
import TextField from "@material-ui/core/TextField";
import { Update } from "../../services/UsersService.js";
import { GetUserId } from "../../services/AccountService";
import { useState, useEffect } from "react";
import { GetUserById } from "../../services/UsersService";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

function EditProfilePage() {
  const [firstName, setFirstName] = useState(" ");
  const [lastName, setLastName] = useState(" ");
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const [loading, setLoading] = useState(true);
  const [openSnack, setOpenSnack] = React.useState(false);

  const [errorFlags, setErrorFlag] = useState([false, false, false, false]);
  let errorFlagsAux = [...errorFlags];

  function Alert(trigger) {
    return <MuiAlert elevation={6} variant="filled" {...trigger} />;
  }
  

  function enterSubmit(event) {
    if (event.code === "Enter" || event.code === "NumpadEnter") update();
  }

  const handleClick = () => {
    setOpenSnack(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  function setFlags(indexList) {
    indexList.forEach((index) => {
      if (index !== null) errorFlagsAux[index] = true;
    });
    setErrorFlag(errorFlagsAux);
  }

  function resetFlags() {
    errorFlagsAux = [false, false, false, false];
    setErrorFlag(errorFlagsAux);
  }

  function validateFirstName(firstName) {
    if (firstName === "") {
      return 0;
    }
    return null;
  }

  function validateLastName(lastName) {
    if (lastName === "") {
      return 1;
    }
    return null;
  }

  function validatePassword(password) {
    if(password === "") password = null;
    if (password !== null) {
      if (password.length < 4 && password.length >= 1) return 2;
    }
    return null;
  }
  function validateConfirmPassword(password, confirmPassword) {
    if(password === "") password = null;
    if (password !== null) {
      if (password !== confirmPassword) return 3;
    }
    return null;
  }
  function validateAllFields(fields) {
    let indexList = [
      validateFirstName(fields.firstname),
      validateLastName(fields.lastname),
      validatePassword(fields.password),
      validateConfirmPassword(fields.password, fields.confirmPassword),
    ];
    setFlags(indexList);
    return !indexList.some((x) => Number.isInteger(x));
  }

  useEffect(() => {
    GetUserById(GetUserId()).then((result) => {
      setFirstName(result.firstname);
      setLastName(result.lastname);
      setLoading(false);
    });
  }, []);
  async function update() {
    resetFlags();
    let success = validateAllFields({
      firstname: firstName,
      lastname: lastName,
      password: password,
      confirmPassword: confirmPassword,
    });
    if (!success) return;
    handleClick();
    await Update(password, firstName, lastName);
  }

  return (
    <div className="center-edit-page">
      <div className="edit-page-div row">
        <div id="edit-forms-container" className="mr-3 mr-sm-0 col-12 col-md-8">
          <h1 className="edit-text-title text-bold">Edit your profile</h1>
          {loading ? (
            <div></div>
          ) : (
            <div className="edit-forms">
              <div className="edit-single-form-container">
                <h4 className="edit-page-form-label">First Name</h4>
                <TextField
                  id="edit-firstname"
                  variant="outlined"
                  className="edit-form-test"
                  defaultValue={firstName}
                  onChange={(x) => setFirstName(x.target.value)}
                  error={errorFlags[0]}
                  helperText={errorFlags[0] ? "Cannot be empty!" : " "}
                  onKeyPress={enterSubmit}
                  fullWidth
                />
              </div>

              <div className="edit-single-form-container">
                <h4 className="edit-page-form-label">Last Name</h4>
                <TextField
                  id="edit-lastname"
                  variant="outlined"
                  className="edit-form-test"
                  defaultValue={lastName}
                  onChange={(x) => setLastName(x.target.value)}
                  error={errorFlags[1]}
                  helperText={errorFlags[1] ? "Cannot be empty!" : " "}
                  onKeyPress={enterSubmit}
                  fullWidth
                />
              </div>
              <div className="edit-single-form-container">
                <h4 className="edit-page-form-label">New Password</h4>
                <TextField
                  id="edit-password"
                  type="password"
                  variant="outlined"
                  className="edit-form-test"
                  onChange={(x) => setPassword(x.target.value)}
                  error={errorFlags[2]}
                  helperText={
                    errorFlags[2]
                      ? "Password must be atleast 4 characters long!"
                      : " "
                  }
                  onKeyPress={enterSubmit}
                  fullWidth
                />
              </div>
              <div className="edit-single-form-container">
                <h4 className="edit-page-form-label">Confirm New Password</h4>
                <TextField
                  id="edit-confirm-password"
                  type="password"
                  variant="outlined"
                  className="edit-form-test"
                  onChange={(x) => setConfirmPassword(x.target.value)}
                  error={errorFlags[3]}
                  helperText={errorFlags[3] ? "Passwords must match!" : " "}
                  onKeyPress={enterSubmit}
                  fullWidth
                />
              </div>
            </div>
          )}

          <button
            className="edit-button btn-hover round bg-red text-bold text-white"
            onClick={update}
          >
            Save
          </button>

          <Snackbar open={openSnack} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Changes saved succesfully!
            </Alert>
          </Snackbar>
        </div>
        <div id="edit-logo-div" className="d-none d-md-flex col-0 col-md-4">
          <img className="edit-page-logo" src={editLogo} alt=""></img>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;
