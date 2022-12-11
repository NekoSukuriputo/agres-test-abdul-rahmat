import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import productSlice from "./productsSlice";

import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'; 

const persistConfig = {
  key: "root",
  storage,
};

const rootReducers = combineReducers({
    auth: authSlice,
    products: productSlice,
})

const persistedReducer = persistReducer(persistConfig,rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store)
