import "./NewOffer.scss";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useEffect, useState } from "react";
import { GetAllCategories } from "../../../services/CategoriesService";
import { AddNewOffer } from "../../../services/OffersService";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  categorySelected: { color: "white", background: "red" },
  category: { color: "red", background: "#FFEEEF" },
});

export function NewOffer(props) {
  const classes = useStyles();
  const [category, setCategory] = useState(null);
  const dialogRef = React.useRef(null);
  const [catPressed, setCatPressed] = useState([false]);
  const [catIds, setCatIds] = useState([]);
  const [errorFlags, setErrorFlag] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  //#region validations
  let errorFlagsAux = [...errorFlags];
  function setFlags(indexList) {
    indexList.forEach((index) => {
      if (index !== null) errorFlagsAux[index] = true;
    });
    setErrorFlag(errorFlagsAux);
  }

  function resetFlags() {
    errorFlagsAux = [false, false, false, false, false, false, false];
    setErrorFlag(errorFlagsAux);
  }

  function validateTitle(title) {
    if (title === "") {
      return 0;
    }
    return null;
  }
  function validateDescription(description) {
    if (description === "") {
      return 1;
    }
    return null;
  }
  function validateCity(city) {
    if (city === "") {
      return 2;
    }
    return null;
  }
  function validateStreetName(streetName) {
    if (streetName === "") {
      return 3;
    }
    return null;
  }
  function validateStreetNumber(streetNo) {
    if (streetNo === "") {
      return 4;
    }
    return null;
  }
  function validatePrice(price) {
    if (price === 0) {
      return 5;
    }
    return null;
  }

  function validateCategory() {
    if (catIds.length === 0) {
      return 6;
    }
    return null;
  }

  function validateAllFields(fields) {
    let indexList = [
      validateTitle(fields.title),
      validateDescription(fields.description),
      validateCity(fields.city),
      validateStreetName(fields.street),
      validateStreetNumber(fields.streetNo),
      validatePrice(fields.price),
      validateCategory(fields.categories),
    ];
    setFlags(indexList);
    return !indexList.some((x) => Number.isInteger(x));
  }
  //#endregion

  function togglePressed(index) {
    let onlyToggleOff = false;
    if (catIds.length === 3) onlyToggleOff = true;

    let aux = [...catPressed];
    aux[index] = !aux[index];
    if (onlyToggleOff) aux[index] = false;

    setCatPressed(aux);
    let ids = [];
    for (let i = 0; i < aux.length; ++i) {
      if (aux[i]) ids.push(category[i].id);
    }
    setCatIds(ids);
  }

  function resetStates() {
    setCatPressed([false]);
    setCatIds([]);
  }

  useEffect(() => {
    async function fetchData() {
      let c = await GetAllCategories();
      setCategory(c);
    }
    fetchData();
  }, [props.open]);

  function renderCategories() {
    if (category == null) return;
    return category.map((x, index) => (
      <span
        key={index}
        className={`new-offer-category-pill text-bold ${
          catPressed[index] ? classes.categorySelected : classes.category
        }`}
        onClick={() => togglePressed(index)}
      >
        {x.name}
      </span>
    ));
  }

  const handleClose = () => {
    resetStates();
    props.setOpen(false);
  };

  async function addNewOffer() {
    resetFlags();
    let title = document.getElementById("new-offer-title").value;
    let description = document.getElementById("new-offer-description").value;
    let prerequisites =
      document.getElementById("new-offer-prerequisites").value === null
        ? ""
        : document.getElementById("new-offer-prerequisites").value;
    let location = {
      cityName: document.getElementById("new-offer-city").value,
      streetName: document.getElementById("new-offer-street").value,
      streetNumber: document.getElementById("new-offer-street-number").value,
    };
    let cost = Math.abs(document.getElementById("new-offer-cost").value);
    let success = validateAllFields({
      title: title,
      description: description,
      city: location.cityName,
      street: location.streetName,
      streetNo: location.streetNumber,
      price: cost,
    });

    if (!success) return;
    await AddNewOffer(
      title,
      description,
      cost,
      prerequisites,
      location,
      catIds
    );
  }

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      ref={dialogRef}
      open={props.open}
      onClose={handleClose}
      classes={{
        paper: "new-offer-dialog",
      }}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle ref={dialogRef} id="form-dialog-title">
        {props.editOffer ? (
          <div className="new-offer-modal-title">Edit offer</div>
        ) : (
          <div className="new-offer-modal-title">Publish a new offer</div>
        )}
      </DialogTitle>
      <DialogContent className="new-offer-content">
        <div className="new-offer-top-forms">
          <div className="new-offer-title-container">
            <div className="new-offer-label text-bold">Title:</div>
            <TextField
              id="new-offer-title"
              variant="outlined"
              className="new-offer-title-form"
              error={errorFlags[0]}
              helperText={errorFlags[0] ? "Cannot be empty!" : " "}
              fullWidth
            />
          </div>
          <div className="new-offer-description-container">
            <div className="new-offer-label text-bold">Description:</div>
            <TextField
              id="new-offer-description"
              variant="outlined"
              className="new-offer-description-form"
              error={errorFlags[1]}
              helperText={errorFlags[1] ? "Cannot be empty!" : " "}
              fullWidth
            />
          </div>
        </div>
        <div className="new-offer-bottom-part">
          <div className="new-offer-bottom-forms">
            <div className="new-offer-form-container">
              <div className="new-offer-label text-bold">
                Prerequisites {"(optional)"}:
              </div>
              <TextField
                id="new-offer-prerequisites"
                variant="outlined"
                className="new-offer-form"
                fullWidth
              />
            </div>
            <div className="new-offer-form-container">
              <div className="new-offer-label text-bold">Adress:</div>
              <div className="new-offer-location-container">
                <div>
                  <TextField
                    id="new-offer-city"
                    variant="outlined"
                    label="City"
                    className="new-offer-form"
                    error={errorFlags[2]}
                    helperText={errorFlags[2] ? "Cannot be empty!" : " "}
                  />
                </div>
                <div>
                  <TextField
                    id="new-offer-street"
                    label="Street"
                    variant="outlined"
                    className="new-offer-form"
                    error={errorFlags[3]}
                    helperText={errorFlags[3] ? "Cannot be empty!" : " "}
                  />
                </div>
                <div>
                  <TextField
                    id="new-offer-street-number"
                    variant="outlined"
                    label="No."
                    className="new-offer-form"
                    error={errorFlags[4]}
                    helperText={errorFlags[4] ? "Cannot be empty!" : " "}
                  />
                </div>
              </div>
            </div>
            <div className="new-offer-form-container">
              <div className="new-offer-label text-bold">Price:</div>
              <CurrencyTextField
                id="new-offer-cost"
                variant="outlined"
                currencySymbol="$"
                maximumValue="999"
                outputFormat="number"
                error={errorFlags[5]}
                helperText={errorFlags[5] ? "Cannot be empty!" : " "}
              />
            </div>
          </div>
          <div className="new-offer-categories-container">
            <div className="new-offer-categories-tags">
              <div className="new-offer-category-label text-bold">
                Category:
              </div>
              {errorFlags[6] && (
                <div className="new-offer-category-label text-bold text-red">
                  {" "}
                  Pick atleast one!
                </div>
              )}
            </div>
            <div className="new-offer-categories">{renderCategories()}</div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <button
          className="bg-pink round btn-hover text-red px-3 py-2 text-bold"
          onClick={handleClose}
          color="primary"
        >
          Cancel
        </button>
        <button
          className="bg-red round btn-hover text-white px-3 py-2 text-bold"
          onClick={addNewOffer}
          color="primary"
        >
          Publish
        </button>
      </DialogActions>
    </Dialog>
  );
}
