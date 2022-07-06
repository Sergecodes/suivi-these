import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// recuperer un coordonateur dans le local storage
const acteur = localStorage.getItem("actor");

const initialState = {
  coordonateur: acteur === 'coordonateur' ? JSON.parse(localStorage.getItem('user')) : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isRejected: false,
  isConnexionSuccessful: false,
  message: "",
};

// Login coordonateur
export const loginCoordonateur = createAsyncThunk(
  "auth/loginCoordonateur",
  async (data, { rejectWithValue }) => {
    try {
      const value = await axios.post(
        "/coordonateurs/login",
        {
          email: data.email,
          motDePasse: data.motDePasse,
        }
      );
      
      return value.data.data;
    } catch (err) {
      console.error(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const authCoordonateurSlice = createSlice({
  name: "authCoordonateur",
  initialState,
  reducers: {
    resetCoordonateur: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.isRejected = false;
      // state.coordonateur = null;
    },
    logoutCoordonateur: (state) => {
      state.coordonateur = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.isRejected = false;
      state.message = "";
      localStorage.removeItem("user");
      localStorage.removeItem('actor');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginCoordonateur.pending, (state, action) => {
        console.log("login pending");
        state.isLoading = true;
      })
      .addCase(loginCoordonateur.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.admin = action.payload;
        state.isLoading = false;
        state.isRejected = false;
        state.message = "";
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem('actor', 'admin');
        
        return state;
      })
      .addCase(loginCoordonateur.rejected, (state, action) => {
        console.log("login rejected");
        state.isLoading = false;
        state.coordonateur = null;
        state.isRejected = true;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetCoordonateur, logoutCoordonateur } =
  authCoordonateurSlice.actions;
export default authCoordonateurSlice.reducer;
