import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userData:{
      email: '',
      password:''
  }
}

export const authSlice = createSlice({
    name:'AuthSlice',
    initialState,
    reducers:{
        setDataAuth : (state,action) =>{
            state.userData = {
              ...state.userData,
              ...action.payload
            }
        }
    }
})

export const { setDataAuth } = authSlice.actions

export default authSlice.reducer