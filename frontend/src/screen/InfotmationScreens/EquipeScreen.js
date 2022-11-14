import React from "react";
import "../../Styles/informations.css";
import Header from "../Header";
import Footer from "../Footer";

function EquipeScreen() {
  return (
    <>
      <Header />
      <div className="informationScreen my-2">
        <div className="container">
          <div className="row">
            <h2>L'équipe</h2>
            <br></br>
            <br></br>
            <hr></hr>

            <h2>Le bureau</h2>
            <br></br>
            <hr></hr>
            <p>
              Pr. <span className="color-orange">Maurice Aurelien Sosso</span>, Recteur de l'UY1 <br></br>
            </p>

            <h2>Représentant de l'école doctorale</h2>
            <br></br>
            <hr></hr>
            <p>
              <span className="mini color-orange">Dr. Bitombe Andre</span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EquipeScreen;
