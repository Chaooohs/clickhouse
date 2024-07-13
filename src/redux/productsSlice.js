import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  productsAll: [],
  status: 'idle',
  error: null,
}

export const fetchPoductsAll = createAsyncThunk(
  'productsAll/fetchPoductsAll',
  async () => {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/`)
    const data = await res.json()
    return data
  }
)

const categoryIdSlice = createSlice({
  name: "productsAll",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchPoductsAll.pending, (state) => {
        state.status = 'in progress'
      })
      .addCase(fetchPoductsAll.fulfilled, (state, action) => {
        state.status = 'success'
        state.productsAll = action.payload.sort(() => Math.random() - Math.random()).slice(0, 4);
                                       
      })
      .addCase(fetchPoductsAll.rejected, (state, action) => {
        state.status = 'fail'
        state.error = action.error.message
      })
  },
})

export default categoryIdSlice.reducer;