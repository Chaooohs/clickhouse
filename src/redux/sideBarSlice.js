import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  burger: false,
  order: false,
  auth: false,
  rerender: false,
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
    statusRerender: (state, actions) => {
      state.rerender = actions.payload
    },
  },
})

export const { statusBurger, statusOrder, statusAuth, statusRerender} = sideBarSlice.actions
export default sideBarSlice.reducer;