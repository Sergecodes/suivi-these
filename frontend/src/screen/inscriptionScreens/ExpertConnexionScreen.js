import React from "react";

function ExpertConnexionScreen() {
  return (
    <div>
      <div style={{ padding: "4%" }} className="container-connexion">
        <div className="container">
          <h1 className="inscription-etudiant-title">Connexion Expert</h1>

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
                      <label for="inputAddress" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="inputAddress"
                      />
                    </div>
                    <div className="col-12">
                      <label for="inputAddress2" className="form-label">
                        Mot de Passe
                      </label>
                      <input
                        type=".password"
                        className="form-control"
                        id="inputAddress2"
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

export default ExpertConnexionScreen;
