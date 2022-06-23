import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// recuperer un etudiant dans le local storage
const admin = JSON.parse(localStorage.getItem("adminInfos"));

const initialState = {
  admin: admin ? admin : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isRejected: false,
  message: "",
};

// Login etudiant
export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const value = await axios.post(
        "/admin/login-admin",
        {
          email: data.email,
          code: data.code,
        }
      );
      localStorage.setItem("user", JSON.stringify(value.data));
      localStorage.setItem("actor", 'admin');
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
      localStorage.removeItem("adminInfos");
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
      .addCase(loginAdmin.pending, (state, action) => {
        console.log("login pending");
        state.isLoading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        if (action.payload && JSON.parse(action.payload)._id) {
          console.log("je suis dana le success");
          state.isLoading = false;
          console.log(`le JSON parse ici est ${action.payload}`);
          state.isSuccess = true;
          state.admin = action.payload;

          localStorage.setItem(
            "coordonateurtInfo",
            JSON.stringify(JSON.parse(action.payload))
          );
        } else {
          console.log("je suis danss le rejected");
          state.isSuccess = false;
          state.isLoading = false;
          state.isRejected = true;
          state.message = "Admin Not Found";
        }

        return state;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        // console.log("login rejected");
        state.isLoading = false;
        state.etudiant = null;
        state.isRejected = true;

        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetAdmin, logoutAdmin } = authAdminSlice.actions;
export default authAdminSlice.reducer;
