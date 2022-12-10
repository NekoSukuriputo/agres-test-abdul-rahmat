import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import RenderWhen from "src/components/RenderWhen";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import VariantForm from "src/components/VariantForm";

import TableVariant from "src/components/TableVariant";

import { v4 as uuid } from "uuid";

import { useSelector, useDispatch } from "react-redux";
import { setDataProduct } from "src/store/productsSlice";

export default function Products() {
  const productName = useSelector((state) => state.products.product.name);
  const SKU = useSelector((state) => state.products.product.sku);
  const brand = useSelector((state) => state.products.product.brand);
  const description = useSelector(
    (state) => state.products.product.description
  );
  const variants = useSelector((state) => state.products.product.variants);

  const brandOptions = useSelector((state) => state.products.brands);

  const dispatch = useDispatch();

  const handleChangeBrand = (event) => {
    dispatch(setDataProduct({ brand: event.target.value }));
  };

  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="productName"
                name="productName"
                label="Nama Produk"
                fullWidth
                variant="outlined"
                defaultValue={productName}
                onChange={(e) => {
                  dispatch(setDataProduct({ name: e.target.value }));
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="sku"
                name="sku"
                label="SKU"
                fullWidth
                variant="outlined"
                defaultValue={SKU}
                onChange={(e) => {
                  dispatch(setDataProduct({ sku: e.target.value }));
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-select-small">Brand</InputLabel>
                <Select
                  value={brand}
                  label="Brand"
                  onChange={handleChangeBrand}
                >
                  {brandOptions.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Deskripsi</Typography>
              <CKEditor
                editor={ClassicEditor}
                data={description}
                onChange={(_event, editor) => {
                  const data = editor.getData();
                  //   console.log({ event, editor, data });
                  dispatch(setDataProduct({ description: data }));
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Varian</Typography>
              <Box sx={{ padding: 2 }}>
                <VariantForm />
              </Box>
              <RenderWhen>
                <RenderWhen.If isTrue={variants.length > 0}>
                  <TableVariant />
                </RenderWhen.If>
                <RenderWhen.If isTrue>
                  <Typography variant="h6">Tidak Ada Varian</Typography>
                </RenderWhen.If>
              </RenderWhen>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
