import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  loginConseiller,
  resetConseiller,
} from "../../redux/authentification/authConseillerSlice";
import LoadingScreen from "../LoadingScreen";

function ConseilScientifiqueConnexionScreen() {
  const [user, setUser] = useState({
    email: "",
    motDePasse: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message, conseiller, isError, isLoading, isSuccess } = useSelector(
    (state) => state.authConseiller
  );
  useEffect(() => {
    if (isError) {
      alert(message);
    }
    if (isSuccess) {
      toast.success("Connexion Reussie");
      navigate("/account");
    }
    if (isLoading) {
      return <LoadingScreen />;
    }
    dispatch(resetConseiller());
  }, [conseiller, isLoading, isSuccess, isError, message, navigate, dispatch]);

  const SubmitHandle = (e) => {
    if (user.motDePasse === "" || user.email === "") {
      alert("renseignez toutes vos informations");
      console.log(isLoading);
      e.preventDefault();
    } else {
      dispatch(loginConseiller(user));
    }

    e.preventDefault();
  };
  return (
    <div>
      <div style={{ padding: "4%" }} className="container-connexion">
        <div className="container">
          <h1 className="inscription-etudiant-title">Connexion Conseil</h1>

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
                        Se Connecter
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
  );
}

export default ConseilScientifiqueConnexionScreen;
