import React from "react";
import "../../Styles/informations.css";

function EquipeScreen() {
  return (
    <div className="informationScreen">
      <div className="container">
        <div className="row">
          <h2>L'équipe</h2>
          <br></br>
          <br></br>
          <hr></hr>

          <h2>Le bureau</h2>
          <br></br>
          <br></br>
          <hr></hr>
          <p>
            M. <span className="color-orange">Eric Benoist</span>, Professeur
            UPS, Directeur <br></br>
            M. <span className="color-orange">Bernard Viguier</span>, Professeur
            INP, Directeur-Adjoint <br></br>
            M. <span className="color-orange">Joël Douin</span>, Directeur de
            Recherche CNRS, Directeur-Adjoint <br></br>
            Mme <span className="color-orange">Agnès Labande</span>, Chargée de
            Recherche CNRS <br></br>
            Mr <span className="color-orange">Jérôme Cuny</span>, Maître de
            Conférences UPS <br></br>
          </p>

          <h2>Secrétariat de l'école doctorale</h2>
          <br></br>
          <br></br>
          <hr></hr>

          <p>
            <span className="mini color-orange"> Mlle Soraya Berkouk</span>
            Maison de le Recherche et le la Valorisation
            <br></br>
            Rez de chaussée, couloir de droite, porte AR023 <br></br>
            Université Toulouse III <br></br>
            118, route de Narbonne <br></br>
            31062 Toulouse Cedex <br></br>
            Tél: 05 62 25 00 64 (from abroad : 0033 5 62 25 00 64) <br></br>
            <span className="mini color-orange">
              {" "}
              https://ed-sdm.univ-yaounde.fr
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default EquipeScreen;
