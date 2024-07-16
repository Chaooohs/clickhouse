import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  status: '',
  error: null,
  isUserLoggedIn: null,
}


export const fetchAuth = createAsyncThunk(
  'auth/fetchAuth',
  async function (a, { rejectWithValue, dispatch }) {
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
      return dispatch(sendAuth(data.access_token))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)


export const sendAuth = createAsyncThunk(
  'auth/sendAuth',
  async function (b, { rejectWithValue }) {
    try {
      const res = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${b}`
        },
      });

      if (!res.ok) {
        throw new Error();
      }

      const user = await res.json();
      localStorage.setItem('clickhouse__user', JSON.stringify([user]))
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    exitUser: (state, action) => {
      state.isUserLoggedIn = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.rejected, (state, action) => {
        state.error = action.payload
      })
      .addCase(sendAuth.fulfilled, (state) => {
        state.status = 'success'
        state.isUserLoggedIn = true
      })
      .addCase(sendAuth.rejected, (state, action) => {
        state.status = 'fail'
        state.error = action.payload
        state.isUserLoggedIn = false
      })
  },
})

export const { exitUser } = authSlice.actions
export default authSlice.reducer;