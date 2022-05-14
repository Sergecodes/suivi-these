import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// recuperer un etudiant dans le local storage
const coordonateur = JSON.parse(localStorage.getItem("departementInfo"));

const initialState = {
  coordonateur: coordonateur ? coordonateur : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isRejected: false,
  message: "",
};

// Login etudiant
export const loginCoordonateur = createAsyncThunk(
  "auth/loginCoordonateur",
  async (data, { rejectWithValue }) => {
    try {
      const value = await axios.post(
        "http://localhost:3001/api/coordonateur/login-coordonateur",
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
    },
    logoutCoordonateur: (state) => {
      localStorage.removeItem("coordonateurInfos");
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
      .addCase(loginCoordonateur.pending, (state, action) => {
        console.log("login pending");
        state.isLoading = true;
      })
      .addCase(loginCoordonateur.fulfilled, (state, action) => {
        // console.log("login fulfilled");
        state.isSuccess = true;
        state.coordonateur = action.payload;
        state.isLoading = false;

        console.log("je suis dans le isloading");

        state.isRejected = true;
        // state.message = action.payload.data.message;
        return state;
      })
      .addCase(loginCoordonateur.rejected, (state, action) => {
        // console.log("login rejected");
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
