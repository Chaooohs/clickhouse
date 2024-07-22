import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  status: 'idle',
  error: null,
}

export const fetchCategoryId = createAsyncThunk(
  'categoryId/fetchCategoryId',
  async (params) => {
    const { id, offset } = params
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${id}&offset=${offset}&limit=10`)
    // const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}/products`)
    const data = await res.json()
    return data
  }
)

const categoryIdSlice = createSlice({
  name: "categoryId",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchCategoryId.pending, (state) => {
        state.status = 'in progress'
      })
      .addCase(fetchCategoryId.fulfilled, (state, action) => {
        state.status = 'success'
        state.products = action.payload
      })
      .addCase(fetchCategoryId.rejected, (state, action) => {
        state.status = 'fail'
        state.error = action.error.message
      })
  },
})

export default categoryIdSlice.reducer;