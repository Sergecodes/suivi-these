import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  loginRectorat,
  resetRectorat,
} from "../../redux/authentification/authRectoratSlice";
import "../../Styles/AdminConnexionScreen.css";
import LoadingScreen from "../LoadingScreen";

function RectoratConnexionScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    code1: "",
    code2: "",
  });

  const { message, rectorat, isError, isLoading, isSuccess } = useSelector(
    (state) => state.authRectorat
  );
  useEffect(() => {
    if (isError) {
      alert(message);
    }
    if (isSuccess) {
      toast.success("Connexion Reussie");
      alert("connexion Reussie");

      navigate("/account");
    }
    if (isLoading) {
      return <LoadingScreen />;
    }
    dispatch(resetRectorat());
  }, [rectorat, isSuccess, isError, message, navigate, dispatch]);

  const SubmitHandle = (e) => {
    if (user.code1 === user.code2) {
      dispatch(loginRectorat(user));
    } else {
      alert("les codes ne correspondent pas ");
      console.log(
        `les code 1 est ${user.code1} et le code 2 est ${user.code2} et l'email de cet utilisateur est ${user.email}`
      );
      e.preventDefault();
    }
    e.preventDefault();
  };

  return (
    <div style={{ padding: "4%" }} className="container-connexion">
      <div className="container">
        <h1 className="inscription-etudiant-title">Connexion Rectorat</h1>

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
                    <label htmlFor="email" className="form-label">
                      Adresse Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="codeSecret1" className="form-label">
                      Code secret 1
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="codeSecret1"
                      onChange={(e) =>
                        setUser({ ...user, code1: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="codeSecret2" className="form-label">
                      Code secret 2
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="codeSecret2"
                      onChange={(e) =>
                        setUser({ ...user, code2: e.target.value })
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
  );
}

export default RectoratConnexionScreen;
