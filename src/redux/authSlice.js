import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  status: '',
  error: null,
}

export const fetchAuth = createAsyncThunk(
  'auth/fetchAuth',
  async function (a, { rejectWithValue }) {
    try {
      const res = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(a)
      });

      if (!res.ok) throw new error()

      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = 'success'
        state.data = action.payload;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.status = 'fail'
        state.error = action.payload
      })
  },
})

export const { } = authSlice.actions
export default authSlice.reducer;