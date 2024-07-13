import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  status: 'idle',
  error: null,
}

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
	async () => {
		const res = await fetch('https://api.escuelajs.co/api/v1/categories')
		const data = await res.json()
    return data
	}
)

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoriesGet: (state, action) => {
      state.categories = action.payload
    }
  },

  extraReducers(builder) {
    builder
		.addCase(fetchCategories.pending, (state) => {
			state.status = 'in progress'
		})
		.addCase(fetchCategories.fulfilled, (state, action) => {
			state.status = 'success'
			state.categories = action.payload
		})
    .addCase(fetchCategories.rejected, (state, action) => {
      state.status = 'fail'
      state.error = action.error.message
    })
  },
})

export const { categoriesGet } = categoriesSlice.actions
export default categoriesSlice.reducer;
