import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// toast.configure()
import LoadingScreen from "../LoadingScreen";

import {
  loginCoordonateur,
  resetCoordonateur,
} from "../../redux/authentification/authCoordonateurSlice";

function CoordonateurInscriptionScreen() {
  const [user, setUser] = useState({
    email: "",
    motDePasse: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const coordonateurInfos = localStorage.getItem("coordonateurtInfo");

  const {
    message,
    coordonateur,
    isError,
    isLoading,
    isSuccess,
    isConnexionSuccessful,
    isRejected,
  } = useSelector((state) => state.authCoordonateur);
  useEffect(() => {
    console.log(`le isError est a ${isError} et le isRejected ${isRejected}`);
    if (isError || isRejected) {
      toast.error(message, { position: toast.POSITION.TOP_CENTER });
    }

    if (isSuccess || coordonateur) {
      navigate("/acteur/coordonateur");
    }
    if (isLoading) {
      return <LoadingScreen />;
    }
    dispatch(resetCoordonateur());
  }, [
    coordonateur,
    isConnexionSuccessful,
    isLoading,
    isSuccess,
    isError,
    message,
    navigate,
    dispatch,
    isRejected,
  ]);

  const SubmitHandle = (e) => {
    if (user.motDePasse === "" || user.email === "") {
      toast.warning("renseignez toutes vos informations");
      e.preventDefault();
    } else {
      console.log(user);

      dispatch(loginCoordonateur(user));
    }

    e.preventDefault();
  };

  return (
    <div>
      {isLoading === true ? (
        <LoadingScreen />
      ) : (
        <div>
          <ToastContainer />

          <div style={{ padding: "4%" }} className="container-connexion">
            <div className="container">
              <h1 className="inscription-etudiant-title">
                Connexion Coordonateur
              </h1>

              <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8 container-data-connexion">
                  <div className="row">
                    <div className="col-md-6 container-data-connexion-left">
                      <div className="cover-left-image"></div>
                    </div>
                    <div className="col-md-6 container-data-connexion-right">
                      <form className="row g-3">
                        <div className="col-12">
                          <label for="email" className="form-label">
                            Email
                          </label>
                          <input
                            required
                            type="email"
                            className="form-control"
                            id="email"
                            onChange={(e) =>
                              setUser({
                                ...user,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-12">
                          <label for="motDePasse" className="form-label">
                            Mot de Passe
                          </label>
                          <input
                            required
                            type="password"
                            className="form-control"
                            id="motDePasse"
                            onChange={(e) =>
                              setUser({
                                ...user,
                                motDePasse: e.target.value,
                              })
                            }
                          />
                        </div>
                        <br />
                        <div className="d-grid gap-2">
                          <button
                            className="btn btn-primary btn-connexion"
                            type="submit"
                            style={{ marginTop: "5px" }}
                            onClick={SubmitHandle}
                          >
                            {isLoading === true
                              ? "Connexion..."
                              : "Se Connecter"}
                          </button>
                        </div>
                        {/* <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </div> */}
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-md-2"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoordonateurInscriptionScreen;
