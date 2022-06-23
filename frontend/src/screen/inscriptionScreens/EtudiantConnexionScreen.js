import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../redux/authentification/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingScreen from "../LoadingScreen.js";
import "../../Styles/AdminConnexionScreen.css"
import "../../Styles/Connexion.css"
import "react-toastify/dist/ReactToastify.css";


function EtudiantConnexionScreen() {
  const [user, setUser] = useState({
    matricule: "",
    niveau: "MASTER 2",
    motDePasse: "",
    email: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { etudiant, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }
    if (isSuccess) {
      toast.success("Connexion Reussie");
      alert("connexion Reussie");

      navigate("/account/evolution");
    }
    if (isLoading) {
      return <LoadingScreen />;
    }
    dispatch(reset());
  }, [etudiant, isSuccess, isError, message, navigate, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(user);
    dispatch(login(user));
  };
  
  return (
    <div>
      <div style={{ padding: "4%" }} className="container-connexion">
        <div className="container">
          <h1 className="inscription-etudiant-title">Connexion Etudiant</h1>

          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8 container-data-connexion">
              <div className="row">
                <div className="col-md-6 container-data-connexion-left">
                  <div className="cover-left-image"></div>
                </div>
                <div className="col-md-6 container-data-connexion-right">
                  <form className="row g-3" onSubmit={submitHandler}>
                    <div className="col-6">
                      <label htmlFor="matricule" className="form-label">
                        Matricule
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="matricule"
                        onChange={(e) =>
                          setUser({ ...user, matricule: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-6">
                      <label htmlFor="email" className="form-label">
                        Email
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
                    <div className="col-md-12">
                      <label htmlFor="inputState" className="form-label">
                        Niveau
                      </label>
                      <select
                        id="inputState"
                        className="form-select"
                        defaultValue="MASTER 2"
                        onChange={(e) =>
                          setUser({ ...user, niveau: e.target.value })
                        }
                      >
                        <option value="MASTER 2">MASTER 2</option>
                        <option value="DOCTORAT">THESE</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label htmlFor="password" className="form-label">
                        Mot de Passe
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        onChange={(e) =>
                          setUser({ ...user, motDePasse: e.target.value })
                        }
                      />
                    </div>
                    <br />
                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-primary btn-connexion"
                        type="submit"
                        style={{ marginTop: "5px" }}
                      >
                        Se Connecter
                      </button>
                    </div>
                    <div
                      style={{
                        // marginBottom: "25px",
                        color: "#029ff0",
                        fontSize: "1rem",
                        cursor: "pointer",
                        textDecoration: "none",
                      }}
                    >
                      <Link to="/inscription/etudiant">
                        Je n'ai pas de compte
                      </Link>
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

export default EtudiantConnexionScreen;

// juste pour connexion

// "matricule":"19m2429",
//     "motDePasse":"jocelyn",
//     "niveaU":"these",
//     "nom":"yemaleu",
//     "prenom":"jocelyn",
//     "email":"jocelynwotcheu2@gmail.com",
//     "dateNaissance":"12/02/2002",
//     "lieuNaissance":"banke",
//     "numTelephone":"690456392",
//     "sexe":"masculin",
//     "urlPhotoProfil":"urlPhotoProfil",
//     "departement":"departement",
//     "encadreur":"encadreur"

// "matricule":"19m2429",
//     "motDePasse":"Jocelyn-1409",
//     "niveaU":"these",
//     "nom":"yemaleu",
//     "prenom":"jocelyn",
//     "email":"jocelynwotcheu2@gmail.com",
//     "dateNaissance":"12/02/2000",
//     "lieuNaissance":"banke",
//     "numTelephone":"690456392",
//     "sexe":"masculin",
//     "urlPhotoProfil":"urlPhotoProfil",
//     "departement":"departement",
//     "encadreur":"encadreur"
