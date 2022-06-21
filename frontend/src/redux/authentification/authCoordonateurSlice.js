import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// recuperer un etudiant dans le local storage
const coordonateur = localStorage.getItem("coordonateurtInfo");

const initialState = {
  coordonateur: coordonateur ? coordonateur : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isRejected: false,
  isConnexionSuccessful: false,
  message: "",
};

// Login etudiant
export const loginCoordonateur = createAsyncThunk(
  "auth/loginCoordonateur",
  async (data, { rejectWithValue }) => {
    try {
      const value = await axios.post(
        "/coordonateurs/login-coord",
        {
          email: data.email,
          motDePasse: data.motDePasse,
        }
      );
      // console.log(data);
      // alert(JSON.stringify(value.data));
      // alert(`La valeur contenue dans le localStorage est ${coordonateur}`)
      // console.log(JSON.stringify(value.data));
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
      // state.coordonateur = null;
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
        // setTimeout
      })
      .addCase(loginCoordonateur.fulfilled, (state, action) => {
        console.log(`le action payload est ${action.payload}`);

        if (action.payload && JSON.parse(action.payload)._id) {
          console.log("je suis dana le success");
          state.isLoading = false;
          console.log(`le JSON parse ici est ${action.payload}`);
          state.isSuccess = true;
          state.coordonateur = action.payload;

          localStorage.setItem(
            "user",
            JSON.stringify(JSON.parse(action.payload))
          );
          localStorage.setItem('actor', 'coordonateur'); 
        } else {
          console.log("je suis danss le rejected");
          state.isSuccess = false;
          state.isLoading = false;
          state.isRejected = true;
          state.message = "Coordonateur Not Found";
        }

        // state.isRejected = false;
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
