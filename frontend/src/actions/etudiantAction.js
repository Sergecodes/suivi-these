import Axios from "axios";
import {
  ETUDIANT_SIGNIN_FAIL,
  ETUDIANT_SIGNIN_REQUEST,
  ETUDIANT_SIGNIN_SUCCESS,
} from "../constants/etudiantConstants";

export const signin = (matricule, motDePasse, niveau) => async (dispatch) => {
  console.log("je suis dans la fonction signin");
  dispatch({
    type: ETUDIANT_SIGNIN_REQUEST,
    payload: { matricule, motDePasse, niveau },
  });
  try {
    const data = await Axios.post("/api/etudiants/login-etudiant", {
      matricule,
      motDePasse,
      niveau,
    });
    dispatch({ type: ETUDIANT_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("etudiantInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ETUDIANT_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
