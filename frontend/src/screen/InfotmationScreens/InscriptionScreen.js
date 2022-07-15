import React from "react";
import "../../Styles/informations.css";
import Header from "../Header";
import Footer from "../Footer";

function InscriptionScreen() {
  return (
    <>
      <Header />
      <div className="informationScreen my-2">
        <div className="container">
          <div className="row">
            <h2>Modalités d'inscription en Doctorat</h2>
            <br></br>
            <br></br>
            <hr></hr>
            <p>Pour s'inscrire en doctorat, il est nécessaire au préalable :</p>
            <br></br>
            <p>
              1- D'avoir pris contact avec un directeur de thèse et d'avoir
              obtenu son accord pour vous encadrer ET<br></br>
              2- D'avoir obtenu l'accord de l'école doctorale.<br></br>
              Sans ces accords, vous ne pouvez pas faire de demande
              d'inscription en doctorat. <br></br>
              Une fois ces accords obtenus, la procédure de demande
              d'inscription s'effectue en ligne.
            </p>
            <p>
              <button className="btn inscription-btn">
                INSCRIVEZ VOUS ICI
              </button>{" "}
              , laissez-vous guider à travers les différentes étapes.
            </p>
            <br></br>
            <p>
              La procédure d'inscription est entièrement dématérialisée, au
              travers de la plateforme ADUM. Une fois vos données saisies, elles
              seront transmises au directeur de thèse, puis au directeur du
              laboratoire et enfin à l'Ecole Doctorale.
              <br></br>
              Vous devrez ensuite finaliser votre inscription à l'UPS. Pour
              toutes les infos concernant votre inscription à l'Université, vous
              trouverez les pages web correspondant aux inscriptions :
            </p>
            <br></br>
            <h4>
              Note : dès votre inscription à l'annuaire d'ADUM vous pourrez :
            </h4>
            <div className="container dedans">
              <ul>
                <li>
                  Profiter des services d'insertion professionnelle (offres
                  d'emploi, publication de CV etc),
                </li>
                <li>Mettre en ligne votre profil de compétences,</li>
                <li>
                  Participer à l'élaboration du réseau des doctorants et
                  docteurs de l'école doctorale.,
                </li>
                <li>
                  Etre informé par courrier électronique de toutes les
                  manifestations organisées pour vous,
                </li>
                <li>
                  Vous inscrire aux modules de formation mis en place par les
                  écoles doctorales,
                </li>
                <li>Consultez les soutenances de thèse à venir.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default InscriptionScreen;
