import React from "react";
import "../../Styles/informations.css";

function DocumentImportantScreen() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <h2>Documents à fournir au secrétariat de l'Ecole Doctorale ..</h2>
          <br></br>
          <br></br>
          <hr></hr>
          <p>
            La liste détaillée est indiquée ci-dessous. Une check-list aidant à
            la consitution du dossier peut être téléchargée.
            <span className="mini color-orange">Télécharger check-list</span>
          </p>
          <h4>... pour le premier examen</h4>
          <p>
            Renseigner toutes les rubriques du formulaire de soutenance commun à
            tous les établissements du site toulousain en accordant une
            attention particulière aux rubriques « proposition des noms de
            rapporteurs » et « proposition de composition du jury»
          </p>
          <h4>... pour le deuxième examen</h4>
          <div className="container dedans">
            <ul>
              <li>
                un exemplaire du manuscrit de thèse AU FORMAT PDF (nouvelle
                règle depuis le CED du 17 janvoer 2018). Le fichier doit soit
                être envoyé diretctement à l'ED, soit déposé sur un serveur et
                c'est le lien qui est transmis à l'ED. La thèse peut être
                rédigée dans une autre langue que le français. Dans ce cas, un
                résumé en français d'au moins un vingtaine de pages devra être
                inclus dans le manuscrit.
              </li>
              <li>les rapports des rapporteurs</li>
              <li>
                une lettre du doctorant s'engageant à fournir toute information
                concernant l'évolution de son parcours professionnel pendant 5
                ans. Une adresse permanente ainsi que des coordonnées
                téléphoniques et électroniques stables doivent figurer dans
                cette lettre.
              </li>
              <li>
                la fiche de renseignements sur le devenir du docteur. La fiche
                devra être renseignée au mieux avec les informations dont
                dispose le doctorant peu avant sa soutenance.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentImportantScreen;
