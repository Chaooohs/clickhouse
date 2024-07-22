import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: '',
  offset: 0,
  limit: 10,
}

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    addCategoryId: (state, action) => {
      state.categoryId = action.payload
    },
    addOffset: (state, action) => {
      state.offset = action.payload
    },
    setFilters: (state, action) => {
      state.categoryId = action.payload.categoryId
      state.offset = action.payload.offset
    },
  },
})

export const { addCategoryId, addOffset, setFilters } = filtersSlice.actions
export default filtersSlice.reducer;