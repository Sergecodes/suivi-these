import React from "react";
import "../../Styles/informations.css";

function ProceduredeSoutenanceScreen() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <h3 className="gris">Procédure de soutenance de thèse</h3>
          <br></br>
          <br></br>
          <h2>Soutenance des thèses dans le contexte COVID 19</h2>
          <br></br>
          <br></br>
          <hr></hr>
          <br></br>
          <p>
            Deux options de soutenance sont actuellement envisageables (au 19
            mai 2020)<br></br> - une soutenance entièrement dématérialisée,
            cadrée par l'Arrêté d'avril 2020 et la note de l'Université Fédérale
            (voir ci-dessous) ;<br></br> - une soutenance en semi-visio cadrée
            par l'Arrêté de mai 2016 qui impose, a minima, la présence du
            Doctorant et du Président du jury dans la même pièce. La présence
            d'autres personnes comme le directeur de thèse dépendra de la salle
            choisie et du respect des conditions sanitaires mises en place dans
            l'établissement hébergeur.
          </p>
          <br></br>
          <p>
            Pour l'UPS, le dossier se soutenance fait état pour chaque membre du
            jury de sa présence dans la salle. La convocation qui sera envoyée
            inclue une procuration à renvoyer avant la soutenance au Directeur
            de thèse.
          </p>
          <br></br>
          <p>
            Pour l'INSA et l'INP, vous pouvez télécharger la procédure de
            soutenance des thèses entièrement dématérialisée (note de
            l'Université Fédérale) et les 2 annexes qui concernent les deux
            options de soutenance (thèses en visio complète ou partielle) en
            fonction de votre établissement :
          </p>
          <p className="color-orange mini">
            Procédure de soutenance <br></br>Annexes pour l'INPT <br></br>{" "}
            Annexes pour l'INSA
          </p>
          <br></br>
          <p>
            Si la mise en place de ces nouvelles procédures est immédiate (la
            COMUE ayant averti les services de la scolarité des établissements),
            il convient de prendre en compte le traitement administratif des
            dossiers avant de fixer une date de soutenance et/ou dépooser sa
            demande.
          </p>
          <br></br>
          <h2>Principe</h2>
          <br></br>
          <br></br>
          <hr></hr>
          <p>
            Les dossiers de soutenance sont examinés à deux reprises par le
            bureau de l'Ecole Doctorale :
          </p>
          <div className="container dedans">
            <ul>
              <li>
                <span className="gras">une première</span> fois pour s'assurer
                de la recevabilité du dossier, choisir les rapporteurs parmi les
                propositions du directeur de thèse, et les convoquer
                officiellement, et examiner le projet de jury envisagé
              </li>
              <li>
                <span>une seconde</span> fois pour examiner les rapports,
                s'assurer de la conformité du jury proposé par le directeur de
                thèse et valider définitivement le dossier.
              </li>
              <li>IMRCP, LHFA, SPCMIB, Pharma-Dev : Eric Benoist</li>
              <li>CEMES, LAAS, LNCMI : Joël Douin</li>
              <li>CIRIMAT, ENIT, LCA : Bernard Viguier</li>
              <li>LCC : Agnès Labande</li>
              <li>IRSAMC (LPT, LPCNO, LCPQ et LCAR) : Jérôme Cuny</li>
            </ul>
          </div>
          <h2>
            Conditions minimales requises pour la présentation du doctorat
          </h2>
          <br></br>
          <br></br>
          <hr></hr>
          <p className="color-blue">
            L'autorisation de soutenance est conditionnée à la validation des
            prérequis de formation suivants, à la date de soutenance :<br></br>
            Au minimum 1 publication acceptée et 1 publication soumise (l'accusé
            de réception du manuscrit de la part de l'éditeur et le manuscrit
            lui-même faisant foi), ou un dépôt de brevet.<br></br>
            Au minimum 1 Communication Orale du doctorant dans un congrès
            national ou international<br></br>
            La validation d'un niveau B2 en langue anglaise (TOEIC - score 750,
            TOEFL IBT - score 80 ou toute autre certification d'un niveau
            équivalent).<br></br>
            (L'ED prend en charge les frais d'inscription à deux tests TOEIC
            ainsi que le coût des cours de formation de préparation à ces
            tests).<br></br>
            Avoir suivi une formation liée à "l'éthique de la Recherche et
            Intégrité scientifique" (ou équivalent)
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProceduredeSoutenanceScreen;
