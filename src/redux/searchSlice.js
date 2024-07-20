import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  status: 'idle',
  error: null,
  isSearchIn: false
}

export const searchProducts = createAsyncThunk(
  'search/searchProducts',
  async (name) => {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/?title=${name}`)
    const data = await res.json()
    return data
  }
)

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    getSearchProducts: (state, action) => {
      state.categories = action.payload
    },
    toggleSearchIcon: (state, action) => {
      state.isSearchIn = action.payload
    },
  },

  extraReducers(builder) {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.status = 'in progress'
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = 'success'
        state.products = action.payload
        state.isSearchIn = true
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.status = 'fail'
        state.error = action.error.message
      })
  },
})

export const { getSearchProducts, toggleSearchIcon } = searchSlice.actions
export default searchSlice.reducer;