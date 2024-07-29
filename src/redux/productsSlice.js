import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  productsAll: [],
  randomGoods: [],
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
  reducers: {
    addPoduct: (state, action) => {
      state.productsAll.push(action.payload)
      // state.productsAll = action.payload
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchPoductsAll.pending, (state) => {
        state.status = 'in progress'
      })
      .addCase(fetchPoductsAll.fulfilled, (state, action) => {
        state.status = 'success'
        state.randomGoods = action.payload.sort(() => Math.random() - Math.random()).slice(0, 4);
        state.productsAll = action. payload

      })
      .addCase(fetchPoductsAll.rejected, (state, action) => {
        state.status = 'fail'
        state.error = action.error.message
      })
  },
})

export default categoryIdSlice.reducer;