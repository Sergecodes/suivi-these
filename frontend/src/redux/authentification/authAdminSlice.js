import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// recuperer l'admin dans le local storage
const acteur = localStorage.getItem("actor");

const initialState = {
  admin: acteur === 'admin' ? JSON.parse(localStorage.getItem('user')) : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isRejected: false,
  message: "",
};

// Login admin
export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const value = await axios.post(
        "/admin/login",
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

export const authAdminSlice = createSlice({
  name: "authAdmin",
  initialState,
  reducers: {
    resetAdmin: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.isRejected = false;
    },
    logoutAdmin: (state) => {
      state.admin = null;
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
      .addCase(loginAdmin.pending, (state, action) => {
        console.log("login pending");
        state.isLoading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = '';
        state.isError = false;
        state.admin = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("actor", 'admin');

        return state;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        // console.log("login rejected");
        state.isLoading = false;
        state.admin = null;
        state.isRejected = true;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetAdmin, logoutAdmin } = authAdminSlice.actions;
export default authAdminSlice.reducer;
