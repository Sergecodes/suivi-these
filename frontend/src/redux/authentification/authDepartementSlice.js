import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// recuperer un departement dans le local storage
const acteur = localStorage.getItem("actor");

const initialState = {
  departement: acteur === 'departement' ? JSON.parse(localStorage.getItem('user')) : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isRejected: false,
  message: "",
};

// Login departement
export const loginDepartement = createAsyncThunk(
  "auth/loginDepartement",
  async (data, { rejectWithValue }) => {
    try {
      const value = await axios.post(
        "/departements/login",
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

export const authDepartementSlice = createSlice({
  name: "authDepartement",
  initialState,
  reducers: {
    resetDepartement: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.isRejected = false;
    },
    logoutDepartement: (state) => {
      state.departement = null;
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
      .addCase(loginDepartement.pending, (state, action) => {
        console.log("login pending");
        state.isLoading = true;
      })
      .addCase(loginDepartement.fulfilled, (state, action) => {
        console.log("login fulfilled");
        state.departement = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = '';
        state.isError = false;
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem('actor', 'departement');

        return state;
      })
      .addCase(loginDepartement.rejected, (state, action) => {
        console.log("login rejected");
        state.isLoading = false;
        state.departement = null;
        state.isRejected = true;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetDepartement, logoutDepartement } =
  authDepartementSlice.actions;
export default authDepartementSlice.reducer;
