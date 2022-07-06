import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// recuperer un etudiant dans le local storage
const acteur = localStorage.getItem("actor");

const initialState = {
  etudiant: acteur === 'etudiant' ? JSON.parse(localStorage.getItem('user')) : null,
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
        "/etudiants/login",
        {
          matricule: data.matricule,
          motDePasse: data.motDePasse,
          niveau: data.niveau,
          email: data.email
        }
      );

      console.log(value)
      return value.data.data;
    } catch (err) {
      console.error(err);
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
      localStorage.removeItem("user");
      localStorage.removeItem('actor');
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
        const payload = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
        state.isRejected = true;
        localStorage.setItem("user", JSON.stringify(payload));
        localStorage.setItem('actor', 'etudiant');
        return state;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
