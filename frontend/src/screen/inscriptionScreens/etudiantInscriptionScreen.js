import axios from 'axios';
import { Result } from 'antd';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    confirmPassword: "",
    niveau: "MASTER 2",
    email: "",
    dateNaissance: "",
    lieuNaissance: "",
    numTelephone: "",
    sexe: "Mâle",
    departement: "",
    encadreur: "",
  });

  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [departements, setDepartements] = useState([]);
  const [encadreurs, setEncadreurs] = useState([]);
  const { message, coordonateur, isError, isLoading, isSuccess } = useSelector(
    (state) => state.registerEtudiant
  );

  const handleDepartementChange = e => {
    const departVal = e.target.value;
    setUser({ ...user, departement: departVal });
    
    // Mettre a jour la liste des encadreurs
    let arr = [];
    for (let dep of departements) {
      if (dep._id === departVal) {
        for (let jury of dep.juries) {
          arr.push({
            id: jury._id,
            nomComplet: jury.nom + ' ' + jury.prenom
          });
        }
        break;
      }
    }
    setEncadreurs(arr);
  }

  // Obtenir la liste des departements
  useEffect(() => {
    axios.get('/departements')
      .then(res => {
        console.log(res);

        let depArr = [];
        for (let dep of res.data) {
          depArr.push({
            id: dep._id,
            nom: dep.nom
          });
        }

        let depart1 = res.data[0];
        setDepartements(depArr);

        // Set default encadreurs
        let encArr = [];
        for (let jury of depart1.juries) {
          encArr.push({
            id: jury._id,
            nomComplet: jury.nom + ' ' + jury.prenom
          });
        }
        setEncadreurs(encArr);
        setUser({ ...user, departement: depart1._id, encadreur: encArr[0].id });
      })
      .catch(err => {
        console.error(err);
      })
  });

  useEffect(() => {
    // if (isError) {
    //   alert(message);
    // }
    // if (isSuccess) {
    //   toast.success("Connexion Reussie");
    //   alert("Connexion Reussie");

    //   // navigate("/account");
    // }
    // if (isLoading) {
    //   return <LoadingScreen />;
    // }
    dispatch(resetRegisterEtudiant());
  }, [isSuccess, dispatch]);
  // coordonateur,
  // isLoading,
  // isSuccess,
  // isError,
  // message,
  // navigate,
  // dispatch,


  const SubmitHandle = (e) => {
    e.preventDefault();

    if (
      user.motDePasse === "" ||
      user.email === "" ||
      user.nom === "" ||
      user.prenom === "" ||
      user.dateNaissance === "" ||
      user.lieuNaissance === "" ||
      user.encadreur === "" ||
      user.sexe === "" ||
      user.departement === "" ||
      user.matricule === "" ||
      user.niveau === "" ||
      user.confirmPassword === ""
    ) {
      alert("renseignez toutes vos informations");
      console.log(user);
    } else if (user.motDePasse !== user.confirmPassword) {
      toast.error("Les mots de passes ne sont pas identiques!", {
        hideProgressBar: true
      });
    } else {
      console.log(user);
      dispatch(registerEtudiant(user));
    }
  };

  const getReturnOutput = () => {
    if (isLoading) {
      return <LoadingScreen />;
    } else if (!isSuccess) {
      return (
        <>
          <div className="form-etudiant-container">
            <div
              className="container"
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
                          onChange={(e) =>
                            setUser({ ...user, confirmPassword: e.target.value })
                          }
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
                        <label htmlFor="Departement" className="form-label">
                          Departement
                        </label>
                        <select
                          id="Departement"
                          className="form-select"
                          value={user.departement}
                          onChange={handleDepartementChange}
                        >
                          {departements.map(dep => 
                            <option key={dep.id} value={dep.id}>{dep.nom}</option>
                          )}
                        </select>{" "}
                      </div>

                      <div className="col-12">
                        <label htmlFor="Encadreur" className="form-label">
                          Encadreur
                        </label>
                        <select
                          id="Encadreur"
                          className="form-select"
                          value={user.encadreur}
                          onChange={(e) =>
                            setUser({ ...user, encadreur: e.target.value })
                          }
                        >
                          {encadreurs.map(enc => 
                            <option key={enc.id} value={enc.id}>{enc.nomComplet}</option>
                          )}
                        </select>{" "}
                      </div>
                      {/* <div className="col-12">
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
                      </div> */}

                      <div className="col-md-7">
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
                          <option value="MASTER 2">
                            MASTER 2
                          </option>
                          <option value="DOCTORAT">DOCTORAT</option>
                        </select>
                      </div>
                      <div className="col-md-5">
                        <label htmlFor="Sexe" className="form-label">
                          Sexe
                        </label>
                        <select
                          id="Sexe"
                          value={user.sexe}
                          className="form-select"
                          onChange={(e) => setUser({ ...user, sexe: e.target.value })}
                        >
                          <option value="Mâle">
                            M
                          </option>
                          <option value="Femelle">F</option>
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
            </div>
          </div>
          <ToastContainer />
        </>
      );
    } else if (isSuccess) {
      return <Result status="success" title="Demande d'ouverture de compte envoye!" />;
    }
  }

  return getReturnOutput();
}

export default EtudiantInscriptionScreen;
