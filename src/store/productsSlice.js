import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { products as productsMock } from "src/mocks/products";

export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async (_arg, _thunkAPI) => {
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
  product: {
    id: "",
    name: "",
    sku: "",
    brand: "",
    description: "",
    variants: [],
  },
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    deleteProduct: (state, action) => {
      const index = state.products.findIndex(
        (item) => item.id === action.payload.id
      );
      state.products.splice(index, 1);
    },
    getProduct: (state, action) => {
      return state.products.find((item) => item.id === action.payload.id);
    },
    setDataProduct: (state, action) => {
      state.product = {
        ...state.product,
        ...action.payload,
      };
    },
    addVariant: (state, action) => {
      state.product.variants.push(action.payload);
    },
    deleteVariant: (state, action) => {
      const index = state.product.variants.indexOf(action.payload);
      state.product.variants.splice(index, 1);
    },
    resetProduct: (state) => {
      state.product = {
        id: "",
        name: "",
        sku: "",
        brand: "",
        description: "",
        variants: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const {
  addProduct,
  deleteProduct,
  getProduct,
  setDataProduct,
  addVariant,
  deleteVariant,
  resetProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
