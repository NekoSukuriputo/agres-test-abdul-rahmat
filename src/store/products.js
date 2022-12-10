import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { products as productsMock } from "src/mocks/products";

const fetchProducts = createAsyncThunk(
  "ProductsSlice/fetchProduct",
  async (_thunkAPI) => {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve(productsMock);
      }, 2000);
    });
  }
);

const initialState = {
  products: [],
  brands: [
    { label: "Xiaomi", value: "Xiaomi" },
    { label: "Redmi", value: "Redmi" },
    { label: "Poco", value: "Poco" },
  ],
};

export const productsSlice = createSlice({
  name: "ProductsSlice",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    deleteProduct: (state, action) => {
      const index = state.products.indexOf(action.payload);
      state.product.splice(index, 1);
    },
    getProduct: (state, action) => {
      state.product.find((item) => item.id === action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });
  },
});


