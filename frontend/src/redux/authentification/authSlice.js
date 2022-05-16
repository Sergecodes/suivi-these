import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// recuperer un etudiant dans le local storage
const etudiant = JSON.parse(localStorage.getItem("etudiantInfo"));

const initialState = {
  etudiant: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isRejected: false,
  message: "",
};

// Login etudiant
export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const value = await axios.post(
        "http://localhost:3001/api/etudiants/login-etudiant",
        {
          matricule: data.matricule,
          motDePasse: data.motDePasse,
          niveau: data.niveau,
        }
      );
      localStorage.setItem("etudiantInfos", JSON.stringify(value.data));
      // console.log(data);
      alert(JSON.stringify(value.data));
      console.log(JSON.stringify(value.data));
      return JSON.stringify(value.data.data);
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.isRejected = false;
    },
    logout: (state) => {
      localStorage.removeItem("etudiantInfos");
      state.etudiant = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.isRejected = false;

      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        console.log("login pending");
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        // console.log("login fulfilled");
        state.isSuccess = true;
        state.etudiant = action.payload;
        state.isLoading = false;

        console.log("je suis dans le isloading");

        state.isRejected = true;
        // state.message = action.payload.data.message;
        return state;
      })
      .addCase(login.rejected, (state, action) => {
        // console.log("login rejected");
        state.isLoading = false;
        state.etudiant = null;
        state.isRejected = true;

        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;