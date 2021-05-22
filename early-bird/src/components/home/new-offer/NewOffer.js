import "./NewOffer.scss";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import { useRef, useEffect, useState } from "react";
import { GetAllCategories } from "../../../services/CategoriesService";
import { red } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {AddNewOffer} from '../../../services/OffersService'

export function NewOffer(props) {
  const [category, setCategory] = useState(null);
  const [selectedDate, setSelectedDate] = React.useState(
    Date().toLocaleString()
  );
  const dialogRef = React.useRef(null);
  const catRefs = useRef([]);
  const [catPressed, setCatPressed] = useState([false]);
  const [catIds, setCatIds] = useState([]);

  function togglePressed(index) {
    if (!catPressed[index]){
      catRefs.current[index].style.background = "red";
      catRefs.current[index].style.color = "white"
    }
    else {
      catRefs.current[index].style.background = "#FFEEEF";
      catRefs.current[index].style.color = "red"
    }
    let aux = [...catPressed];
    aux[index] = !aux[index];
    setCatPressed(aux);
    let ids = [];
    for (let i = 0; i < aux.length; ++i) {
      if (aux[i])
          ids.push(category[i].id)
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: red,
    },
  });

  async function addNewOffer(){
    let title = document.getElementById("new-offer-title").value;
    let description = document.getElementById("new-offer-description").value;
    let prerequisites = document.getElementById("new-offer-prerequisites").value;
    let location = {
      cityName: document.getElementById("new-offer-city").value,
      streetName: document.getElementById("new-offer-street").value,
      streetNumber: document.getElementById("new-offer-street-number").value,
    }
    await AddNewOffer(title, description, 1, prerequisites, location, catIds);

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
        <h1>Publish a new offer</h1>
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
              <div className="new-offer-location-container">
                <div>
                  <div className="new-offer-label text-bold">
                    City:
                  </div>
                  <TextField
                    id="new-offer-city"
                    variant="outlined"
                    className="new-offer-form"
                  />
                </div>
                <div>
                  <div className="new-offer-label text-bold">
                    Street:
                  </div>
                  <TextField
                    id="new-offer-street"
                    variant="outlined"
                    className="new-offer-form"
                  />
                </div>
                <div>
                  <div className="new-offer-label text-bold">
                    Street No. :
                  </div>
                  <TextField
                    id="new-offer-street-number"
                    variant="outlined"
                    className="new-offer-form"
                  />
                </div>
              </div>
            </div>
            <div className="new-offer-form-container">
              <ThemeProvider theme={defaultMaterialTheme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <div className="new-offer-category-label text-bold">
                    Deadline:
                  </div>
                  <KeyboardDatePicker
                    variant="outlined"
                    format="dd/MM/yyyy"
                    id="date-picker-inline"
                    className="calendar"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </ThemeProvider>
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
