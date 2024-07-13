import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  burger: false,
  order: false,
  auth: false,
}

const sideBarSlice = createSlice({
  name: "sidebars",
  initialState,
  reducers: {
    statusBurger: (state, action) => {
      state.burger = action.payload
    },
    statusOrder: (state, action) => {
      state.order = action.payload
    },
    statusAuth: (state, actions) => {
      state.auth = actions.payload
    },
  },
})

export const { statusBurger, statusOrder, statusAuth, } = sideBarSlice.actions
export default sideBarSlice.reducer;