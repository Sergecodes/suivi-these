import React from "react";
import "../../Styles/informations.css";
import Header from "../Header";
import Footer from "../Footer";

function CandidatureScreen() {
  return (
    <>
      <Header />
      <div className="informationScreen my-2">
        <div className="container">
          <div className="row">
            <h2>Modalité recrutement</h2>
            <br></br>
            <br></br>
            <hr></hr>
            <ul>
              <li>Une demande adressée au coordinateur du CRFD-STG</li>
              <li>Un rapport d'avancement du travail de recherche (Doctorat / Ph.D) ou un certificat de laboratoire de recherche (Master 2) signé par le directeur de recherche</li>
              <li>Une preuve de sélection (liste de sélection)</li>
              <li>Un relevé de notes (D1 pour l'inscription en 2ème année et D2 pour l'inscription en 3ème année)</li>
              <li>Une photo d'identité récente en couleur (4x4).</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CandidatureScreen;
