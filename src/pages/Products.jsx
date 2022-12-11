import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import ProductTable from "src/components/ProductTable";
import { useNavigate } from "react-router-dom";

export default function ProductsPage() {
  const navigate = useNavigate();

  const handleClickAdd = () => {
    navigate("/products/add");
  };

  return (
    <>
      <Box sx={{marginTop:5,marginBottom:5}}>
        <Button variant="contained" onClick={handleClickAdd}>
          Tambah Data Product
        </Button>
      </Box>
      <Box>
        <ProductTable />
      </Box>
    </>
  );
}
