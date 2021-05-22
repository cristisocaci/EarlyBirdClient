import "./NewOffer.scss";
import React from "react";
import Button from "@material-ui/core/Button";
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
import { useEffect, useState } from "react";
import { GetAllCategories } from "../../../services/CategoriesService";
import { red } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

export function NewOffer(props) {
  
  const [category, setCategory] = useState(null);
  const [selectedDate, setSelectedDate] = React.useState(
    Date().toLocaleString()
  );
  const dialogRef = React.useRef(null);
  const catRefs = useRef([]);
  const [catPressed, setCatPressed] = useState([]);

  function togglePressed(index) {
      if (!catPressed[index])
          catRefs.current[index].style.border = "1px solid red"
      else
          catRefs.current[index].style.border = "none"
      let aux = [...catPressed];
      aux[index] = !aux[index];
      setCatPressed(aux);

      let q = Object.assign({}, props.query);
      let ids = [];
      for (let i = 0; i < aux.length; ++i) {
          if (aux[i])
              ids.push(props.categories[i].id)
      }
      q.categoryIds = ids;
      props.setQuery(q);
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
      <span key={index} className="new-offer-category-pill text-bold bg-red text-white">
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

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      ref={dialogRef}
      open={props.open}
      onClose={handleClose}
      classes={{
        paper: "new-offer-dialog"
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
              <div className="new-offer-label text-bold">Location:</div>
              <TextField
                id="new-offer-location"
                variant="outlined"
                className="new-offer-form"
                fullWidth
              />
            </div>
            <div className="new-offer-form-container">
              <ThemeProvider theme={defaultMaterialTheme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className="new-offer-category-label text-bold">Deadline:</div>
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
        <button className="bg-pink round btn-hover text-red px-3 py-2 text-bold" onClick={handleClose} color="primary">
          Cancel
        </button>
        <button className="bg-red round btn-hover text-white px-3 py-2 text-bold" onClick={handleClose} color="primary">
          Publish
        </button>
      </DialogActions>
    </Dialog>
  );
}