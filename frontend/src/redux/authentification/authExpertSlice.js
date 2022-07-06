import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// recuperer un expert dans le local storage
const acteur = localStorage.getItem("actor");

const initialState = {
  expert: acteur === 'expert' ? JSON.parse(localStorage.getItem('user')) : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isRejected: false,
  message: "",
};

// Login expert
export const loginExpert = createAsyncThunk(
  "auth/loginExpert",
  async (data, { rejectWithValue }) => {
    try {
      const value = await axios.post(
        "/expert/login-expert",
        {
          email: data.email,
          code: data.MotDePasse,
        }
      );
      
      return value.data.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const authExpertSlice = createSlice({
  name: "authAdmin",
  initialState,
  reducers: {
    resetExpert: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.isRejected = false;
    },
    logoutExpert: (state) => {
      state.expert = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.isRejected = false;
      state.message = "";
      localStorage.removeItem('actor');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginExpert.pending, (state, action) => {
        console.log("login pending");
        state.isLoading = true;
      })
      .addCase(loginExpert.fulfilled, (state, action) => {
        // console.log("login fulfilled");
        state.isSuccess = true;
        state.expert = action.payload;
        state.isLoading = false;
        state.isRejected = false;
        state.message = "";
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem('actor', 'expert');

        return state;
      })
      .addCase(loginExpert.rejected, (state, action) => {
        // console.log("login rejected");
        state.isSuccess = false;
        state.isLoading = false;
        state.expert = null;
        state.isRejected = true;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetExpert, logoutExpert } = authExpertSlice.actions;
export default authExpertSlice.reducer;
