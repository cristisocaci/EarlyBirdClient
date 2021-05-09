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

export default function NewOffer(props) {
  const [category, setCategory] = useState(null);
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
      <span key={index} className="bg-red text-white category-pill">
        {x.name}
      </span>
    ));
  }

  const [selectedDate, setSelectedDate] = React.useState(
    Date().toLocaleString()
  );
  const dialogRef = React.useRef(null);
  const handleClose = () => {
    props.setOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Dialog
      className="new-offer-dialog"
      ref={dialogRef}
      open={props.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle ref={dialogRef} id="form-dialog-title">
        Publish a new offer
      </DialogTitle>
      <DialogContent className="new-offer-content">
        <div className="new-offer-top-forms">
          <TextField
            id="new-offer-title"
            variant="outlined"
            className="new-offer-form"
          />
          <TextField
            id="new-offer-description"
            label="Description"
            variant="outlined"
            className="new-offer-description-form"
          />
        </div>
        <div className="new-offer-bottom-part">
          <div className="new-offer-bottom-forms">
            <TextField
              id="new-offer-prerequisites"
              label="Prerequisites"
              variant="outlined"
              className="new-offer-form"
            />
            <TextField
              id="new-offer-location"
              label="Location"
              variant="outlined"
              className="new-offer-form"
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                variant="outlined"
                format="dd/MM/yyyy"
                id="date-picker-inline"
                label="Deadline"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className="new-offer-categories">{renderCategories()}</div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Publish
        </Button>
      </DialogActions>
    </Dialog>
  );
}
