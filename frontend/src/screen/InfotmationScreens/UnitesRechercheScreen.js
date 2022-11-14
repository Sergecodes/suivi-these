import React from "react";
import "../../Styles/informations.css";
import Header from "../Header";
import Footer from "../Footer";

function UnitesRechercheScreen() {
  return (
    <>
      <Header />
      <div className="informationScreen my-2">
        <div className="container">
          <div className="row">
            <h2>Unites de Recherche</h2>
            <br></br>
            <br></br>
            <hr></hr>
            <p>Notre ecole doctorale propose 05 (cinq) Unites de recherches</p>
            <div className="container dedans">
              <ul>
                <li>
                  <span className="color-orange">URFD-MIBA</span> : Mathematiques, Informatique et Biosciences-Appliquées
                </li>
                <li>
                  <span className="color-orange">URFD-PA</span> : Physique et Applications
                </li>
                <li>
                  <span className="color-orange">URFD-CA</span> : Chimie et Applications
                </li>
                <li>
                  <span className="color-orange">URFD-GA</span> : Géosciences et Applications
                </li>
                <li>
                  <span className="color-orange">URFD-SIA</span> : Sciences d'Ingénierie et Applications
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UnitesRechercheScreen;
