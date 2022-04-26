import React from "react";

function ConseilScientifiqueConnexionScreen() {
  return (
    <div>
      <div style={{ padding: "4%" }} className="container-connexion">
        <div className="container">
          <h1 className="inscription-etudiant-title">
            Connexion Conseil Scientifique
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
                      <label for="inputAddress" className="form-label">
                        Code secret 1
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                      />
                    </div>
                    <div className="col-12">
                      <label for="inputAddress2" className="form-label">
                        Code secret 2
                      </label>
                      <input
                        type="text"
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

export default ConseilScientifiqueConnexionScreen;
