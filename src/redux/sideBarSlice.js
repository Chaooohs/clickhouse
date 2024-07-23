import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  burger: false,
  order: false,
  auth: false,
  rerender: false,
  search: false,
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
    statusSearch: (state, actions) => {
      state.search = actions.payload
    },
  },
})

export const { statusBurger, statusOrder, statusAuth, statusRerender, statusSearch, } = sideBarSlice.actions
export default sideBarSlice.reducer;