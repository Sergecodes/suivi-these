import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// recuperer un etudiant dans le local storage
const jury = JSON.parse(localStorage.getItem("juryInfos"));

const initialState = {
  jury: jury ? jury : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isRejected: false,
  message: "",
};

// Login etudiant
export const loginJury = createAsyncThunk(
  "auth/loginJury",
  async (data, { rejectWithValue }) => {
    try {
      const value = await axios.post(
        "/jury/login",
        {
          email: data.email,
          motDePasse: data.motDePasse,
        },
        {
          withCredentials:true
        }
      );
      // localStorage.setItem("juryInfos", JSON.stringify(value.data));
      // console.log(data);
      // console.log(JSON.stringify(value.data));
      return JSON.stringify(value.data.data);
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const authJurySlice = createSlice({
  name: "authJury",
  initialState,
  reducers: {
    resetJury: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.isRejected = false;
    },
    logoutJury: (state) => {
      localStorage.removeItem("juryInfos");
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
      .addCase(loginJury.pending, (state, action) => {
        console.log("login pending");
        state.isLoading = true;
      })
      .addCase(loginJury.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload && JSON.parse(action.payload)._id) {
          console.log(`le action payload est ${action.payload}`);
          state.isLoading = false;
          state.isSuccess = true;
          state.jury = action.payload;

          localStorage.setItem(
            "user",
            JSON.stringify(JSON.parse(action.payload))
          );
          localStorage.setItem('actor', 'jury');
        } else {
          state.isSuccess = false;
          state.isLoading = false;
          state.isRejected = true;
          state.message = "Coodonateur Not Found";
        }

        // state.message = action.payload.data.message;
        return state;
      })
      .addCase(loginJury.rejected, (state, action) => {
        // console.log("login rejected");
        state.isLoading = false;
        state.etudiant = null;
        state.isRejected = true;

        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetJury, logoutJury } = authJurySlice.actions;
export default authJurySlice.reducer;
