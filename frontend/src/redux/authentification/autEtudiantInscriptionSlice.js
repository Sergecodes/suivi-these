import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// recuperer un etudiant dans le local storage
// const etudiant = JSON.parse(localStorage.getItem("user"));

const initialState = {
  etudiant: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isRejected: false,
  showResult:false,
  message: "",
};

// Register etudiant
export const registerEtudiant = createAsyncThunk(
  "auth/registerEtudiant",
  async (data, { rejectWithValue }) => {
    try {
      const value = await axios.post(
        "/etudiants/register",
        {
          matricule: data.matricule,
          nom: data.nom,
          prenom: data.prenom,
          motDePasse: data.motDePasse,
          niveau: data.niveau,
          email: data.email,
          dateNaissance: data.dateNaissance,
          lieuNaissance: data.lieuNaissance,
          numTelephone: data.numTelephone,
          sexe: data.sexe,
          departement: data.departement,
          encadreur: data.encadreur,
        }
      );

      return value.data.data;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const registerEtudiantSlice = createSlice({
  name: "authRegisterEtudiant",
  initialState,
  reducers: {
    resetRegisterEtudiant: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.isRejected = false;
      state.showResult = false;
    },
    logoutRegisterEtudiant: (state) => {
      state.etudiant = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.isRejected = false;
      state.showResult = false;
      state.message = "";
      localStorage.removeItem("user");
      localStorage.removeItem("actor");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerEtudiant.pending, (state, action) => {
        console.log("login pending");
        state.isLoading = true;
      })
      .addCase(registerEtudiant.fulfilled, (state, action) => {
        console.log("login fulfilled");
        state.isLoading = false;
        state.isSuccess = true;
        state.message = '';
        state.isError = false;
        state.showResult = true;
        return state;
      })
      .addCase(registerEtudiant.rejected, (state, action) => {
        console.log("login rejected");
        state.isLoading = false;
        state.etudiant = null;
        state.isRejected = true;
        state.isError = true;
        state.showResult = false;
        state.message = action.payload;
      });
  },
});

export const { resetRegisterEtudiant, logoutRegisterEtudiant } =
  registerEtudiantSlice.actions;
export default registerEtudiantSlice.reducer;
