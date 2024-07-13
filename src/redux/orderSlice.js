import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: {},
  get: true,
}

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderComplited: (state, action) => {
      state.order = action.payload
    },
    orderGet: (state, action) => {
      state.get = action.payload
    },
  },
})

export const { orderComplited, orderGet } = orderSlice.actions
export default orderSlice.reducer;