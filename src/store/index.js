import { configureStore  } from '@reduxjs/toolkit'

import authSlice from './authSlice'
import productSlice from './productsSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice
  },
})