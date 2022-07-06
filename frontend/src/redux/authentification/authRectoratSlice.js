import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// recuperer le rectorat dans le local storage
const acteur = localStorage.getItem("actor");

const initialState = {
  rectorat: acteur === 'rectorat' ? JSON.parse(localStorage.getItem('user')) : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isRejected: false,
  message: "",
};

// Login rectorat
export const loginRectorat = createAsyncThunk(
  "auth/loginRectorat",
  async (data, { rejectWithValue }) => {
    try {
      const value = await axios.post(
        "/rectorat/login-rectorat",
        {
          email: data.email,
          code: data.code,
        }
      );

      return value.data.data;
    } catch (err) {
      console.error(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const authRectoratSlice = createSlice({
  name: "authRectorat",
  initialState,
  reducers: {
    resetRectorat: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.isRejected = false;
    },
    logoutRectorat: (state) => {
      localStorage.removeItem("rectoratInfos");
      state.rectorat = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.isRejected = false;

      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginRectorat.pending, (state, action) => {
        console.log("login pending");
        state.isLoading = true;
      })
      .addCase(loginRectorat.fulfilled, (state, action) => {
        // console.log("login fulfilled");
        state.isSuccess = true;
        state.isLoading = false;
        state.message = "";
        state.isError = false;
        state.isRejected = false;
        state.rectorat = action.payload;

        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem('actor', 'rectorat');
        return state;
      })
      .addCase(loginRectorat.rejected, (state, action) => {
        console.log("login rejected");
        state.isLoading = false;
        state.rectorat = null;
        state.isRejected = true;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetRectorat, logoutRectorat } = authRectoratSlice.actions;
export default authRectoratSlice.reducer;
