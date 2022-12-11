import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Tooltip from "@mui/material/Tooltip";

import Snackbar from "src/components/SnackBar";
import TableVariant from "src/components/TableVariant";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import parseHtml from "html-react-parser";

import { useSelector, useDispatch } from "react-redux";
import {
  deleteProduct,
  setDataProduct,
  resetProduct,
} from "src/store/productsSlice";
import RenderWhen from "src/components/RenderWhen";

import { useNavigate } from "react-router-dom";


const tableHeader = ["Nama", "SKU", "Brand", "Deskripsi", "Varian", ""];

const ViewVarian = ({ open, onClose }) => {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Data Varian</DialogTitle>
        <DialogContent>
          <TableVariant isPreview={true} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default function TableProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const [openVariant, setOpenVariant] = React.useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const navigate = useNavigate();


//   React.useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

  const handleCloseVariant = async () => {
    await dispatch(resetProduct());
    setOpenVariant(false);
  };

  const handleOpenVariant = async (product) => {
    await dispatch(setDataProduct(product));
    setOpenVariant(true);
  };
  const onClickEditProduct = async (product) => {
    await dispatch(setDataProduct(product));
    navigate(`/products/${product.id}`)
  };

  const onClickDeleteProduct = async (product) => {
    await dispatch(deleteProduct(product));
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
        message="Suskes menghapus produk"
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
            {products.map((row) => (
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
                <TableCell align="left">{row.brand}</TableCell>
                <TableCell align="left">
                  {row.description ? parseHtml(row.description) : "-"}
                </TableCell>
                <TableCell align="left">
                  <RenderWhen>
                    <RenderWhen.If
                      isTrue={row.variants && row.variants.length > 0}
                    >
                      <Button
                        variant="outlined"
                        onClick={() => {
                          handleOpenVariant(row);
                        }}
                      >
                        Lihat Varian
                      </Button>
                      <ViewVarian
                        open={openVariant}
                        onClose={handleCloseVariant}
                      />
                    </RenderWhen.If>
                    <RenderWhen.If isTrue>Tidak Ada Varian</RenderWhen.If>
                  </RenderWhen>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      onClick={() => {
                        onClickEditProduct(row);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Hapus">
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => {
                        onClickDeleteProduct(row);
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
