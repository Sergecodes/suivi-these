import React from "react";
import "../../Styles/informations.css";

function CandidatureScreen() {
  return (
    <div className="informationScreen">
      <div className="container">
        <div className="row">
          <h2>Modalité recrutement</h2>
          <br></br>
          <br></br>
          <hr></hr>
          <p>
            L'Ecole Doctorale « Sciences de la Matière » de l'Université de
            Toulouse propose une grande variété de sujets de thèse à réaliser
            dans ses laboratoires. Pour pouvoir candidater les étudiants doivent
            avoir obtenu un Master Recherche 2ième année en Sciences ou un
            diplôme équivalent obtenu dans une institution universitaire de
            n'importe quel pays. Il n'y a pas d'âge limite pour candidater ni de
            conditions de pays d'origine. L'équivalence des diplômes est décidée
            par le Conseil Scientifique et Pédagogique (CSP) de l'Ecole
            Doctorale. L'équivalence est basée sur le contenu et la nature des
            cours académiques suivis. Les diplômes français d'Ingénieur et les
            Masters Professionnels sont considérés comme équivalent à condition
            qu'une expérience de recherche (stage par exemple) ou un intérêt
            manifeste pour la recherche soient avérés.
          </p>
          <br></br>
          <p>
            En ce qui concerne les financements de thèse{" "}
            <span className="gras">DEUX CAS DOIVENT ÊTRE DISTINGUÉS:</span>
          </p>
          <br></br>
          <p>
            <span className="gras">I.FINANCEMENTS MESR</span> alloués par
            l'Ecole Doctorale et provenant du Ministère de l'Enseignement
            Supérieur et de la Recherche (MESR). Une vingtaine de propositions
            de thèse recevront un tel financement (à peu près 1450 euros nets
            par mois) pour une période de 36 mois. Attention! Dans la liste des{" "}
            <span className="color-orange">propositions de thèse</span> seuls
            les sujets dont le titre débute par le mot MESR sont éligibles à ce
            financement et nécessitent une candidature par l'application web sur
            le site. Plus de détails sont donnés plus loin. Notez que certains
            laboratoires ont défini un ordre de priorité parmi les sujets MESR.
            N'hésitez pas à contacter les responsables du sujet pour obtenir
            plus d'informations. Dans tous les cas il est impératif de{" "}
            <span className="color-orange">
              REMPLIR LE FORMULAIRE DE CANDIDATURE{" "}
            </span>
            sur le site de l'ED.
          </p>
          <br></br>
          <p className="color-orange">
            Tout dossier ne comportant pas au minima un CV détaillé, les notes
            des trois dernières années du cursus avec les classements associés,
            une lettre de motivation en adéquation avec le sujet sélectionné,
            une ou des lettres de recommandation ne sera pas pris en compte.
          </p>
          <br></br>
          <p>
            <span className="gras">II.AUTRES FINANCEMENTS:</span> Les autres
            sujets non labellisés MESR ont ou n'ont pas un financement provenant
            d'autres sources (CNRS, ANR, CEA, etc.). Pour ces propositions, nous
            vous demandons de contacter directement les personnes qui ont
            proposé le sujet et SVP DE NE PAS REMPLIR LE FORMULAIRE DE
            CANDIDATURE sur le site.
          </p>

          <h4 className="gras">
            PROPOSITIONS DE THÈSE MESR: COMMENT CANDIDATER?
          </h4>
          <br></br>
          <p>La sélection des candidats est faite de la manière suivante:</p>
          <br></br>
          <p>
            Les candidats intéressés par un ou plusieurs sujets MESR doivent
            remplir le formulaire de candidature en ligne{" "}
            <span className="color-orange">avant le 6 MAI 2022</span>
            (formulaire accessible en cliquant sur le bouton "Candidater"
            localisé en fin de page de chaque proposition de thèse). En
            parallèle, il est demandé au candidat de contacter directement les
            personnes responsables du sujet ainsi que le directeur du
            laboratoire.
            <br></br>
            <br></br>
            Les candidatures seront examinées par le Conseil Scientifique et
            Pédagogique <span className="color-orange">le 17 mai 2022</span>.
            Une liste de personnes qualifiées pour obtenir un financement de
            thèse MESR sera établie ce jour-là et une liste complémentaire avec
            possibilité éventuelle d'exament oral vers la fin mai sera également
            établie. Dans tous les cas, la décision de l'Ecole Doctorale sera
            envoyée aux candidats par e-mail le plus tôt possible.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CandidatureScreen;
