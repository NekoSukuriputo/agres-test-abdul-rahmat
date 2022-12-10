import * as React from "react";
import TextField from "@mui/material/TextField";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import Snackbar from "./SnackBar";

import { v4 as uuid } from "uuid";

import { useDispatch } from "react-redux";
import { addVariant } from "src/store/productsSlice";


export default function VarianDialog() {
  const dispatch = useDispatch();

  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [variantData, setDataVariant] = React.useState({
    name: "",
    sku: "",
    amount: "",
  });

  const handleClickOpen = () => {
    setDataVariant({
      name: "",
      sku: "",
      amount: "",
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAdd = async () => {
    dispatch(
      addVariant({
        id: uuid(),
        name: variantData.name,
        sku: variantData.sku,
        amount: variantData.amount,
      })
    );
    setOpen(false);
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };
  return (
    <>
      <Snackbar
        open={openSnackBar}
        onClose={handleCloseSnackBar}
        severity="success"
        message="Suskes menambakan varian"
      />
      <Button variant="contained" onClick={handleClickOpen}>
        Tambah Variant
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tambah Data Varian</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nama"
            fullWidth
            variant="outlined"
            defaultValue={variantData.name}
            onChange={(e) => {
              setDataVariant((variantData) => ({
                ...variantData,
                ...{ name: e.target.value },
              }));
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="SKU"
            fullWidth
            variant="outlined"
            defaultValue={variantData.sku}
            onChange={(e) => {
              setDataVariant((variantData) => ({
                ...variantData,
                ...{ sku: e.target.value },
              }));
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Harga"
            fullWidth
            variant="outlined"
            type="number"
            defaultValue={variantData.amount}
            onChange={(e) => {
              setDataVariant((variantData) => ({
                ...variantData,
                ...{ amount: e.target.value },
              }));
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Tambah</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
