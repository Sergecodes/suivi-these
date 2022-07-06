import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// recuperer un conseil dans le local storage
const acteur = localStorage.getItem("actor");

const initialState = {
  conseiller: acteur === 'conseil' ? JSON.parse(localStorage.getItem('user')) : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isRejected: false,
  message: "",
};

// Login conseil
export const loginConseiller = createAsyncThunk(
  "auth/loginConseiller",
  async (data, { rejectWithValue }) => {
    try {
      const value = await axios.post(
        "/conseils/login-conseil",
        {
          email: data.email,
          motDePasse: data.motDePasse,
        }
      );
      
      return value.data.data;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const authConseillerSlice = createSlice({
  name: "authConseiller",
  initialState,
  reducers: {
    resetConseiller: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.isRejected = false;
    },
    logoutConseiller: (state) => {
      state.conseil = null;
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
      .addCase(loginConseiller.pending, (state, action) => {
        console.log("login pending");
        state.isLoading = true;
      })
      .addCase(loginConseiller.fulfilled, (state, action) => {
        // console.log("login fulfilled");
        state.conseil = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = '';
        state.isError = false;
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem('actor', 'conseil');
        
        return state;
      })
      .addCase(loginConseiller.rejected, (state, action) => {
        // console.log("login rejected");
        state.isLoading = false;
        state.conseil = null;
        state.isRejected = true;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetConseiller, logoutConseiller } =
  authConseillerSlice.actions;
export default authConseillerSlice.reducer;
