import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import Tooltip from "@mui/material/Tooltip";

import Snackbar from "./SnackBar";

import helpers from "src/helpers";

import { deleteVariant } from "src/store/productsSlice";

import { useSelector, useDispatch } from "react-redux";

export default function TableVariant() {
  const dispatch = useDispatch();

  const variants = useSelector((state) => state.products.product.variants);

  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const tableHeader = ["Nama", "SKU", "Harga"];

  const onClickDeleteVarian = async (item) => {
    dispatch(deleteVariant(item));
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
        message="Suskes menghapus varian"
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {tableHeader.map((item, index) => (
                <TableCell align="left" key={index}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {variants.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.sku}</TableCell>
                <TableCell align="left">
                  Rp. {helpers.formatAmount(row.amount)}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Hapus">
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => {
                        onClickDeleteVarian(row);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
