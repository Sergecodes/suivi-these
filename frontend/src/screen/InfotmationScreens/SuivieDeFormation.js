import React from "react";
import "../../Styles/informations.css";

function SuivieDeFormation() {
  return (
    <div className="informationScreen">
      <div className="container">
        <div className="row">
          <h2>Parrain de thèse ou référent</h2>
          <br></br>
          <br></br>
          <hr></hr>
          <p className="gras">Un parrain/marraine : pour qui, pourquoi ?</p>
          <br></br>
          <p>
            Tous les doctorants inscrits à notre ED se voient attribuer par le
            bureau de l'Ecole Doctorale un parrain ou une marraine appelé aussi
            référent. Cette personne est un chercheur ou enseignant-chercheur de
            l'ED n'appartenant pas à l'unité d'accueil du doctorant. La
            nomination du(de la) parrain(marraine) ne devient effective qu'après
            accord formel des deux parties (référent et doctorant). Une liste
            regroupant les couples référent/doctorant de l'année en cours est
            envoyée par l'ED à l'ensemble des personnes concernées (doctorant,
            directeur de thèse et référent).
          </p>
          <br></br>
          <p>
            Le rôle du référent est multiple : s'assurer du bon déroulement de
            la thèse (suivi de thèse et conditions de recherche), être un
            interlocuteur privilégié du doctorant extérieur au laboratoire (en
            cas de difficulté avec son directeur de thèse) et sensibiliser ou
            informer le doctorant sur l'insertion professionnelle post
            doctorale.
          </p>
          <br></br>
          <h2>Missions du référent </h2>
          <br></br>
          <br></br>
          <hr></hr>
          <span className="gras">Durant ces entrevues, il doit :</span>
          <div className="container-fluid dedans">
            <ul>
              <li>
                S'assurer que la thèse se déroule dans de bonnes conditions.
              </li>
              <li>
                Vérifier que le doctorant connait les règles établies par
                l'Ecole Doctorale et l'Université de Toulouse pour la
                présentation du doctorat aussi bien en termes de validation des
                crédits de formation que de production scientifique. Le référent
                pourra notamment s'assurer que le doctorant connait les
                différentes manières d'obtenir les 6 crédits de formation
                exigés. Pour rappel, chaque doctorant doit valider 6 crédits de
                formation dont obligatoirement deux à visée professionalisante
                et un relatif à une communication orale dans un congrès national
                ou international. Les doctorants en contrat CIFRE doivent
                valider seulement 4 crédits dont obligatoirement une
                communication orale dans un congrès national ou international.
              </li>
              <li>
                Etre à l'écoute et avec l'accord du doctorant, alerter l'ED en
                cas de difficultés entre le directeur de thèse et le doctorant.
                Il pourra s'aider du questionnaire téléchargeable ICI pour
                évaluer la situation.
              </li>
              <li>
                Faire parvenir un compte-rendu détaillé au secrétariat de
                l'Ecole Doctorale et, s'il le juge nécessaire, au doctorant. Le
                compte rendu ne doit pas être envoyé au directeur de thèse.
              </li>
            </ul>
            <br></br>
          </div>

          <h2>Missions du doctorant</h2>
          <br></br>
          <br></br>
          <hr></hr>
          <span>Chaque doctorant devra :</span>
          <div className="container-fluid dedans">
            <ul>
              <li>
                Contacter son(sa) parrain(marraine) pour fixer les dates des
                entretiens
              </li>
              <li>
                Se retourner vers son référent pour tout problème rencontré ou
                qu'il pourrait rencontrer lors de son parcours de thèse.
              </li>
            </ul>
          </div>
          <h2>Organisation des entretiens</h2>
          <br></br>
          <br></br>
          <hr></hr>
          <p>
            Le doctorant doit contacter son parrain pour fixer les dates des
            entretiens.{" "}
            <span className="gras">
              Le directeur de thèse ne peut pas assister à ces entretiens
            </span>
            .
          </p>
          <div className="container-fluid">
            <ul>
              <li>
                Trois entretiens sont prévus, un par année de thèse. Ils devront
                être finalisés avant le 15 juillet de l'année en cours.
              </li>
              <li>
                Avant chaque entretien, le doctorant aura à remplir un dossier
                téléchargeable ici :{" "}
                <span className="color-orange">1ère année, 2ième année</span>,
                3ième année et l'envoyer à son référent. Ce dossier permettra au
                référent de prendre connaissance du sujet de thèse, de s'assurer
                du bon avancement de son travail de thèse et de vérifier que le
                candidat connait les règles établies par l'ED pour la future
                soutenance de son doctorat. Ces entretiens ont aussi pour but
                (i) de faire le point sur la validation des crédits de formation
                requis, le TOEIC et la production scientifique, l'objectif étant
                de vérifier que le doctorant possède les différents pré-requis
                pour soutenir son doctorat, (ii) de s'assurer que le travail de
                thèse avance, (iii) de veiller à ce que le projet d'insertion
                socioprofessionnelle du doctorant existe, qu'il est en voie de
                finalisation et que le doctorant possède toutes les informations
                sur les différents parcours post-doctorat.
              </li>
              <li>
                Les justificatifs (attestations, compte-rendus de stages de
                formation) devront être fournis avec le dossier de soutenance.
              </li>
              <li>
                A la fin de chaque entretien, le dossier sera complété par le
                référent puis envoyé au secrétariat de l'Ecole Doctorale par le
                référent.
              </li>
              <li>
                En cas de quatrième année de thèse, un 4ième entretien sera à
                faire avec le parrain, avec un{" "}
                <span className="color-orange">
                  dossier d'entretien de quatrième année.
                </span>
              </li>
              <li>
                <span className="gras">ATTENTION</span>, ce dossier ainsi
                complété par le référent sera une pièce obligatoire pour la
                réinscription en année supérieure (ou pour l'inscription pour la
                soutenance).
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuivieDeFormation;
