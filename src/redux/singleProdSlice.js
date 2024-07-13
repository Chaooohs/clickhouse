import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  product: [],
  status: 'idle',
  error: null,
}

export const fetchSingleProduct = createAsyncThunk(
  'product/fetchSingleProduct',
	async (id) => {
		const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
		const data = await res.json()
    return data
	}
)

const categoryIdSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
		.addCase(fetchSingleProduct.pending, (state) => {
			state.status = 'in progress'
		})
		.addCase(fetchSingleProduct.fulfilled, (state, action) => {
			state.status = 'success'
			state.product = action.payload
		})
    .addCase(fetchSingleProduct.rejected, (state, action) => {
      state.status = 'fail'
      state.error = action.error.message
    })
  },
})

export default categoryIdSlice.reducer;