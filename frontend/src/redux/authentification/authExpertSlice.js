import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// recuperer un etudiant dans le local storage
const expert = JSON.parse(localStorage.getItem("expertInfos"));

const initialState = {
  expert: expert ? expert : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isRejected: false,
  message: "",
};

// Login etudiant
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
      localStorage.setItem("expertInfos", JSON.stringify(value.data));
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
      localStorage.removeItem("expertInfos");
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
      .addCase(loginExpert.pending, (state, action) => {
        console.log("login pending");
        state.isLoading = true;
      })
      .addCase(loginExpert.fulfilled, (state, action) => {
        // console.log("login fulfilled");
        state.isSuccess = true;
        state.etudiant = action.payload;
        state.isLoading = false;

        console.log("je suis dans le isloading");

        state.isRejected = true;
        // state.message = action.payload.data.message;
        return state;
      })
      .addCase(loginExpert.rejected, (state, action) => {
        // console.log("login rejected");
        state.isLoading = false;
        state.etudiant = null;
        state.isRejected = true;

        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetExpert, logoutExpert } = authExpertSlice.actions;
export default authExpertSlice.reducer;
