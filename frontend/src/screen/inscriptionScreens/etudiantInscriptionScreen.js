import React from "react";
import "../../Styles/Connexion.css";

function EtudiantInscriptionScreen() {
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
                  <label for="inputEmail4" className="form-label">
                    Nom
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                  />
                </div>
                {/* Pour le prenom */}
                <div className="col-md-6">
                  <label for="inputEmail4" className="form-label">
                    Prenom
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                  />
                </div>
                {/* pour le matricule */}
                <div className="col-md-12">
                  <label for="inputEmail4" className="form-label">
                    Matricule
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                  />
                </div>
                {/* ------------------ */}
                <div className="col-md-6">
                  <label for="inputEmail4" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail4"
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputEmail4" className="form-label">
                    Numero de telephone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputPassword4" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword4"
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputPassword4" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword4"
                  />
                </div>
                {/* date de naissance */}
                <div className="col-md-6">
                  <label for="inputPassword4" className="form-label">
                    Date de Naissance
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputPassword4"
                  />
                </div>
                {/* Lieu de naissance */}
                <div className="col-md-6">
                  <label for="inputPassword4" className="form-label">
                    Lieu de Naissance
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                  />
                </div>

                <div className="col-12">
                  <label for="inputAddress" className="form-label">
                    Email Encadreur
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputCity" className="form-label">
                    Unite de Recherche
                  </label>
                  <select id="inputState" className="form-select">
                    <option selected>Unite 1</option>
                    <option>Unite 2</option>
                    <option>Unite 3</option>
                  </select>{" "}
                </div>
                <div className="col-md-4">
                  <label for="inputState" className="form-label">
                    Niveau
                  </label>
                  <select id="inputState" className="form-select">
                    <option selected>MASTER 2</option>
                    <option>THESE</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label for="inputZip" className="form-label">
                    Sex
                  </label>
                  <select id="inputState" className="form-select">
                    <option selected>M</option>
                    <option>F</option>
                  </select>{" "}
                </div>
                <div className="col-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                    />
                    <label className="form-check-label" for="gridCheck">
                      Check me out
                    </label>
                  </div>
                </div>
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-primary btn-connexion"
                    type="submit"
                    id="btn-color-orange"
                    // style={{ marginTop: "5px" }}
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
