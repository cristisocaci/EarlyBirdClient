import "./NewOffer.scss";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useEffect, useState, useRef } from "react";
import { GetAllCategories } from "../../../services/CategoriesService";
import {
  AddNewOffer,
  DeleteOffer,
  GetOfferById,
  UpdateOffer,
} from "../../../services/OffersService";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  categorySelected: { color: "white", background: "red" },
  category: { color: "red", background: "#FFEEEF" },
});

export function NewOffer(props) {
  const classes = useStyles();
  const categoryRef = useRef(null);
  const [category, setCategory] = useState(null);
  categoryRef.current = category;
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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prerequisites, setPrerequisites] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [price, setPrice] = useState("");
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
    if (price === "") {
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

  function initCategories(categoryIds) {
    let auxCat = [];
    if (categoryRef.current == null) return;
    for (let i = 0; i < categoryRef.current.length; i++) {
      auxCat.push(categoryIds.includes(categoryRef.current[i].id));
    }
    setCatPressed(auxCat);
  }

  useEffect(() => {
    
    async function fetchData() {
      console.log('t');
      let c = await GetAllCategories();
      setCategory(c);
      if (props.editOffer) {
        if (props.id === undefined) return;
        GetOfferById(props.id).then((result) => {
          if (result === undefined) return;
          setTitle(result.title);
          setDescription(result.description);
          setPrerequisites(result.prerequisites);
          setCity(result.location.cityName);
          setStreet(result.location.streetName);
          setStreetNo(result.location.streetNumber);
          setPrice(result.cost);
          let categoryIds = result.categories.map((x) => x.categoryId);
          setCatIds(categoryIds);
          initCategories(categoryIds);
        });
      }
    }
    fetchData();
  }, [props.id, props.editOffer]);

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
    let success = validateAllFields({
      title: title,
      description: description,
      city: city,
      street: street,
      streetNo: streetNo,
      price: price,
    });
    let location = {
      cityName: city,
      streetName: street,
      streetNumber: streetNo,
    };

    if (!success) return;
    await AddNewOffer(
      title,
      description,
      price,
      prerequisites,
      location,
      catIds
    );
    window.location.reload();
    handleClose();
  }

  async function updateOffer() {
    resetFlags();
    let success = validateAllFields({
      title: title,
      description: description,
      city: city,
      street: street,
      streetNo: streetNo,
      price: price,
    });
    let location = {
      cityName: city,
      streetName: street,
      streetNumber: streetNo,
    };

    if (!success) return;
    await UpdateOffer(
      props.id,
      title,
      description,
      price,
      prerequisites,
      location,
      catIds
    );
    window.location.reload();
    handleClose();
  }

  async function deleteOffer(){
    await DeleteOffer(props.id);
    window.location.reload();
    handleClose();
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
              defaultValue={props.editOffer ? title : ""}
              onChange={(x) => setTitle(x.target.value)}
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
              defaultValue={props.editOffer ? description : ""}
              onChange={(x) => setDescription(x.target.value)}
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
                defaultValue={props.editOffer ? prerequisites : ""}
                onChange={(x) => setPrerequisites(x.target.value)}
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
                    defaultValue={props.editOffer ? city : ""}
                    onChange={(x) => setCity(x.target.value)}
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
                    defaultValue={props.editOffer ? street : ""}
                    onChange={(x) => setStreet(x.target.value)}
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
                    defaultValue={props.editOffer ? streetNo : ""}
                    onChange={(x) => setStreetNo(x.target.value)}
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
                value={props.editOffer ? price : ""}
                onChange={(x) => setPrice(x.target.value)}
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
      <div className="offer-modal-buttons">
        <div>
          {props.editOffer && (
            <button
              className="bg-pink round btn-hover text-red px-3 py-2 text-bold"
              onClick={deleteOffer}
              color="primary"
            >
              Delete
            </button>
          )}
        </div>
        <div className="offer-left-buttons">
          <div>
            <button
              className="bg-pink round btn-hover text-red px-3 py-2 text-bold"
              onClick={handleClose}
              color="primary"
            >
              Cancel
            </button>
          </div>
          <div>
            {props.editOffer ? (
              <button
                className="bg-red round btn-hover text-white px-3 py-2 text-bold"
                onClick={updateOffer}
                color="primary"
              >
                Save
              </button>
            ) : (
              <button
                className="bg-red round btn-hover text-white px-3 py-2 text-bold"
                onClick={addNewOffer}
                color="primary"
              >
                Publish
              </button>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
