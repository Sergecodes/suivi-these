import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// recuperer un etudiant dans le local storage
const departement = JSON.parse(localStorage.getItem("departementInfo"));

const initialState = {
  departement: departement ? departement : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isRejected: false,
  message: "",
};

// Login etudiant
export const loginDepartement = createAsyncThunk(
  "auth/loginDepartement",
  async (data, { rejectWithValue }) => {
    try {
      const value = await axios.post(
        "http://localhost:3001/api/departement/login-departement",
        {
          matricule: data.email,
          motDePasse: data.motDePasse,
        }
      );
      localStorage.setItem("departementInfos", JSON.stringify(value.data));
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
      localStorage.removeItem("departementInfos");
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
      .addCase(loginDepartement.pending, (state, action) => {
        console.log("login pending");
        state.isLoading = true;
      })
      .addCase(loginDepartement.fulfilled, (state, action) => {
        // console.log("login fulfilled");
        state.isSuccess = true;
        state.etudiant = action.payload;
        state.isLoading = false;

        console.log("je suis dans le isloading");

        state.isRejected = true;
        // state.message = action.payload.data.message;
        return state;
      })
      .addCase(loginDepartement.rejected, (state, action) => {
        // console.log("login rejected");
        state.isLoading = false;
        state.etudiant = null;
        state.isRejected = true;

        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetDepartement, logoutDepartement } =
  authDepartementSlice.actions;
export default authDepartementSlice.reducer;
