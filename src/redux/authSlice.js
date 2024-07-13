import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  user: {},
  status: '',
  error: null,
}

export const fetchAuth = createAsyncThunk(
  'auth/fetchAuth',
  async function (_, { rejectWithValue }) {
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

export const sendAuth = createAsyncThunk(
  'auth/sendAuth',
  async function (a, { rejectWithValue }) {
    try {
      const res = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
        method: 'GET',
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcyMDg4Njc5MCwiZXhwIjoxNzIyNjE0NzkwfQ.LKhzrKaaYOrFW2aB0lRBHUTJwwt6yXGPFxHo1dtShQk"
        },
      });

      if (!res.ok) {
        throw new Error();
      }

      const user = await res.json();
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.fulfilled, (state, action) => {
        // state.status = 'success'
        state.data = action.payload;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        // state.status = 'fail'
        state.error = action.payload
      })
      .addCase(sendAuth.fulfilled, (state, action) => {
        state.status = 'success'
        state.user = action.payload;
      })
      .addCase(sendAuth.rejected, (state, action) => {
        state.status = 'fail'
        state.error = action.payload
      })
  },
})

export const { } = authSlice.actions
export default authSlice.reducer;