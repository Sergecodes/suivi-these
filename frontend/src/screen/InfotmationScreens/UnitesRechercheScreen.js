import React from "react";
import "../../Styles/informations.css";

function UnitesRechercheScreen() {
  return (
    <div className="informationScreen">
      <div className="container">
        <div className="row">
          <h2>Unites de Recherche</h2>
          <br></br>
          <br></br>
          <hr></hr>
          <p>Notre ecole doctorale propose 03 (trois) Unites de recherches</p>
          <div className="container dedans">
            <ul>
              <li>
                {" "}
                <span className="color-orange">Unites 1</span> : lorem12 ipsum
                dollor sit amet set
              </li>
              <li>
                <span className="color-orange">Unites 2</span> : lorem12 ipsum
                dollor sit amet set
              </li>
              <li>
                <span className="color-orange">Unites 3</span> : lorem12 ipsum
                dollor sit amet set
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnitesRechercheScreen;
