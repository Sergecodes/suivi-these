import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// recuperer un jury dans le local storage
const acteur = localStorage.getItem("actor");

const initialState = {
  jury: acteur === 'jury' ? JSON.parse(localStorage.getItem('user')) : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isRejected: false,
  message: "",
};

// Login jury
export const loginJury = createAsyncThunk(
  "auth/loginJury",
  async (data, { rejectWithValue }) => {
    try {
      const value = await axios.post(
        "/jury/login",
        {
          email: data.email,
          motDePasse: data.motDePasse,
        }
      );
      
      // console.log(data);
      console.log(JSON.stringify(value.data));
      return JSON.stringify(value.data.data);
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const authJurySlice = createSlice({
  name: "authJury",
  initialState,
  reducers: {
    resetJury: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.isRejected = false;
    },
    logoutJury: (state) => {
      state.jury = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.isRejected = false;
      state.message = "";
      localStorage.removeItem("jury");
      localStorage.removeItem("actor");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginJury.pending, (state, action) => {
        console.log("login pending");
        state.isLoading = true;
      })
      .addCase(loginJury.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.message = '';
        state.isError = false;
        state.jury = action.payload;

        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem('actor', 'expert');
        return state;
      })
      .addCase(loginJury.rejected, (state, action) => {
        // console.log("login rejected");
        state.isLoading = false;
        state.jury = null;
        state.isRejected = true;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetJury, logoutJury } = authJurySlice.actions;
export default authJurySlice.reducer;
