import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/AdminConnexionScreen.css";
import LoadingScreen from "../LoadingScreen";
import "../../Styles/AdminConnexionScreen.css";
import {
  loginAdmin,
  resetAdmin,
} from "../../redux/authentification/authAdminSlice";

function AdminConnexionScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [code2, setCode2] = useState();

  const [user, setUser] = useState({
    email: "",
    motDePasse: "",
  });

  const { message, admin, isError, isLoading, isSuccess, isRejected } =
    useSelector((state) => state.authAdmin);
  useEffect(() => {
    if (isError || isRejected) {
      toast.error(message);
    }
    if (isSuccess || admin) {
      toast.success("Connexion Reussie",{hideProgressBar: true
      });
      alert("connexion Reussie",{hideProgressBar: true
      });

      navigate("/acteur/admin/dashboard");
    }
    if (isLoading) {
      return <LoadingScreen />;
    }
    dispatch(resetAdmin());
  }, [admin, isSuccess, isError, message, navigate, dispatch]);

  const SubmitHandle = (e) => {
    if (  user.motDePasse === "" && user.email === "") {
      toast.warning("Remplissez tout vos champs",{hideProgressBar: true
      });
      e.preventDefault();
    } else {
        dispatch(loginAdmin(user));
     
    }

    e.preventDefault();
  };
  return (
    <div>
      {isLoading === true ? (
        <LoadingScreen />
      ) : (
        <div style={{ padding: "4%" }} className="container-connexion">
          <div className="container">
            <h1 className="inscription-etudiant-title">
              Connexion Administrateur
            </h1>
            <ToastContainer />

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
                          autoComplete="false"

                          id="email"
                          onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-12">
                        <label htmlFor="codeSecret1" className="form-label">
                          Mot De Passe
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="codeSecret1"
                          autoComplete="false"
                          onChange={(e) =>
                            setUser({ ...user, motDePasse: e.target.value })
                          }
                        />
                      </div>
                      {/* <div className="col-12">
                        <label htmlFor="codeSecret2" className="form-label">
                          Code secret 2
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="codeSecret2"
                          onChange={(e) => setCode2(e.target.value)}
                        />
                      </div> */}
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
      )}
    </div>
  );
}

export default AdminConnexionScreen;
