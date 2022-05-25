import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  registerEtudiant,
  resetRegisterEtudiant,
} from "../../redux/authentification/autEtudiantInscriptionSlice";
import "../../Styles/Connexion.css";

import LoadingScreen from "../LoadingScreen";

function EtudiantInscriptionScreen() {
  const [user, setUser] = useState({
    matricule: "",
    nom: "",
    prenom: "",
    motDePasse: "",
    niveau: "",
    email: "",
    dateNaissance: "",
    lieuNaissance: "",
    numTelephone: "",
    sexe: "",
    urlPhotoProfil: "a revoir",
    uniteRecherche: "",
    encadreur: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message, coordonateur, isError, isLoading, isSuccess } = useSelector(
    (state) => state.registerEtudiant
  );
  useEffect(() => {
    if (isError) {
      alert(message);
    }
    if (isSuccess) {
      toast.success("Connexion Reussie");
      alert("connexion Reussie");

      // navigate("/account");
    }
    if (isLoading) {
      return <LoadingScreen />;
    }
    dispatch(resetRegisterEtudiant());
  }, [
    coordonateur,
    isLoading,
    isSuccess,
    isError,
    message,
    navigate,
    dispatch,
  ]);

  const SubmitHandle = (e) => {
    if (
      user.motDePasse === "" ||
      user.email === "" ||
      user.nom === "" ||
      user.prenom === "" ||
      user.dateNaissance === "" ||
      user.lieuNaissance === "" ||
      user.encadreur === "" ||
      user.sexe === "" ||
      user.uniteRecherche === "" ||
      user.matricule === ""
    ) {
      alert("renseignez toutes vos informations");
      e.preventDefault();
    } else {
      console.log(user);

      dispatch(registerEtudiant(user));
    }

    e.preventDefault();
  };

  return (
    <div className="form-etudiant-container">
      <div
        className="container
      "
        style={{ padding: "5%" }}
      >
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 box-form-container">
            <div className="container" style={{ padding: "5%" }}>
              <form className="row g-3">
                <h1 className="inscription-etudiant-title">Inscription</h1>

                {/* Pour le nom */}
                <div className="col-md-6">
                  <label htmlFor="nom" className="form-label">
                    Nom
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nom"
                    required
                    onChange={(e) => setUser({ ...user, nom: e.target.value })}
                  />
                </div>
                {/* Pour le prenom */}
                <div className="col-md-6">
                  <label htmlFor="prenom" className="form-label">
                    Prenom
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Prenom"
                    onChange={(e) =>
                      setUser({ ...user, prenom: e.target.value })
                    }
                  />
                </div>
                {/* pour le matricule */}
                <div className="col-md-12">
                  <label htmlFor="Matricule" className="form-label">
                    Matricule
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Matricule"
                    onChange={(e) =>
                      setUser({ ...user, matricule: e.target.value })
                    }
                  />
                </div>
                {/* ------------------ */}
                <div className="col-md-6">
                  <label htmlFor="Email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="Email"
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="Numero" className="form-label">
                    Numero de telephone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Numero"
                    onChange={(e) =>
                      setUser({ ...user, numTelephone: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="Password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="Password"
                    onChange={(e) =>
                      setUser({ ...user, motDePasse: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="Confirm" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="Confirm"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {/* date de naissance */}
                <div className="col-md-6">
                  <label htmlFor="Date" className="form-label">
                    Date de Naissance
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="Date"
                    onChange={(e) =>
                      setUser({ ...user, dateNaissance: e.target.value })
                    }
                  />
                </div>
                {/* Lieu de naissance */}
                <div className="col-md-6">
                  <label htmlFor="Lieu" className="form-label">
                    Lieu de Naissance
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Lieu"
                    onChange={(e) =>
                      setUser({ ...user, lieuNaissance: e.target.value })
                    }
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="Encadreur" className="form-label">
                    Email Encadreur
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Encadreur"
                    onChange={(e) =>
                      setUser({ ...user, encadreur: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="Unite" className="form-label">
                    Unite de Recherche
                  </label>
                  <select
                    id="Unite"
                    className="form-select"
                    value={user.uniteRecherche}
                    onChange={(e) =>
                      setUser({ ...user, uniteRecherche: e.target.value })
                    }
                  >
                    <option value="unite 2" selected>
                      Unite 1
                    </option>
                    <option value="unite 2">Unite 2</option>
                    <option value="unite 3">Unite 3</option>
                  </select>{" "}
                </div>
                <div className="col-md-4">
                  <label htmlFor="Niveau" className="form-label">
                    Niveau
                  </label>
                  <select
                    id="Niveau"
                    className="form-select"
                    value={user.niveau}
                    onChange={(e) =>
                      setUser({ ...user, niveau: e.target.value })
                    }
                  >
                    <option selected value="MASTER 2">
                      MASTER 2
                    </option>
                    <option value="DOCTORAT">DOCTORAT</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label htmlFor="Sex" className="form-label">
                    Sex
                  </label>
                  <select
                    id="Sex"
                    value={user.sexe}
                    className="form-select"
                    onChange={(e) => setUser({ ...user, sexe: e.target.value })}
                  >
                    <option selected value="MASCULIN">
                      M
                    </option>
                    <option value="FEMININ">F</option>
                  </select>{" "}
                </div>

                <div className="d-grid gap-2">
                  <button
                    className="btn btn-primary btn-connexion"
                    type="submit"
                    id="btn-color-orange"
                    // style={{ marginTop: "5px" }}
                    onClick={SubmitHandle}
                  >
                    S'inscrire
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
        <div />
      </div>
    </div>
  );
}

export default EtudiantInscriptionScreen;
