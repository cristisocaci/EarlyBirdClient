import "./NewOffer.scss";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useRef, useEffect, useState } from "react";
import { GetAllCategories } from "../../../services/CategoriesService";
import { AddNewOffer } from "../../../services/OffersService";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

export function NewOffer(props) {
  const [category, setCategory] = useState(null);
  const dialogRef = React.useRef(null);
  const catRefs = useRef([]);
  const [catPressed, setCatPressed] = useState([false]);
  const [catIds, setCatIds] = useState([]);

  function togglePressed(index) {
    let catFlag = false;
    if (catIds.length >= 3) catFlag = true;
    if (!catPressed[index]) {
      if (catFlag) return;
      catRefs.current[index].style.background = "red";
      catRefs.current[index].style.color = "white";
    } else {
      catRefs.current[index].style.background = "#FFEEEF";
      catRefs.current[index].style.color = "red";
    }
    let aux = [...catPressed];
    aux[index] = !aux[index];
    setCatPressed(aux);
    let ids = [];
    for (let i = 0; i < aux.length; ++i) {
      if (aux[i]) ids.push(category[i].id);
    }
    setCatIds(ids);
  }

  useEffect(() => {
    async function fetchData() {
      let c = await GetAllCategories();
      setCategory(c);
    }
    fetchData();
  }, []);

  function renderCategories() {
    if (category == null) return;
    console.log(catIds);
    return category.map((x, index) => (
      <span
        key={index}
        onClick={() => togglePressed(index)}
        ref={(element) => catRefs.current.push(element)}
        className="new-offer-category-pill text-bold bg-pink text-red"
      >
        {x.name}
      </span>
    ));
  }

  const handleClose = () => {
    props.setOpen(false);
  };

  async function addNewOffer() {
    let title = document.getElementById("new-offer-title").value;
    let description = document.getElementById("new-offer-description").value;
    let prerequisites = document.getElementById(
      "new-offer-prerequisites"
    ).value;
    let location = {
      cityName: document.getElementById("new-offer-city").value,
      streetName: document.getElementById("new-offer-street").value,
      streetNumber: document.getElementById("new-offer-street-number").value,
    };
    let cost = Math.abs(document.getElementById("new-offer-cost").value);
    await AddNewOffer(title, description, cost, prerequisites, location, catIds);
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
        <div className="new-offer-modal-title">Publish a new offer</div>
      </DialogTitle>
      <DialogContent className="new-offer-content">
        <div className="new-offer-top-forms">
          <div className="new-offer-title-container">
            <div className="new-offer-label text-bold">Title:</div>
            <TextField
              id="new-offer-title"
              variant="outlined"
              className="new-offer-title-form"
              fullWidth
            />
          </div>
          <div className="new-offer-description-container">
            <div className="new-offer-label text-bold">Description:</div>
            <TextField
              id="new-offer-description"
              variant="outlined"
              className="new-offer-description-form"
              fullWidth
            />
          </div>
        </div>
        <div className="new-offer-bottom-part">
          <div className="new-offer-bottom-forms">
            <div className="new-offer-form-container">
              <div className="new-offer-label text-bold">Prerequisites:</div>
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
                  />
                </div>
                <div>
                  <TextField
                    id="new-offer-street"
                    label="Street"
                    variant="outlined"
                    className="new-offer-form"
                  />
                </div>
                <div>
                  <TextField
                    id="new-offer-street-number"
                    variant="outlined"
                    label="No."
                    className="new-offer-form"
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
                maximumValue='999'
                outputFormat="number"
              />
            </div>
          </div>
          <div className="new-offer-categories-container">
            <div className="new-offer-category-label text-bold">Category:</div>
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
