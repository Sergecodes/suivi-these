import React from "react";
import "../../Styles/informations.css";

function FormationEnTheseScreen() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="formation-these">
            <h2>Formation en thèse</h2>
            <hr></hr>
            <p>
              Dans le cadre de l'actuelle habilitation, les écoles doctorales
              sont tenues de proposer aux doctorants des formations
              complémentaires pendant leurs années de thèse. Ces formations
              doivent non seulement permettre de préparer les docteurs au métier
              de chercheur dans le secteur public ou privé, mais plus
              généralement à tout métier requérant les compétences acquises lors
              de la réalisation d'une thèse.
            </p>
            <br></br>
            <p>
              Les formations proposées par l'ED ont un double objectif : élargir
              le champ de compétence scientifique du doctorant et le préparer à
              son insertion professionnelle.
            </p>
            <br></br>
            <br></br>
            <br></br>
            <p className="color-orange">Page mise à jour le 19 novembre 2021</p>
            <br></br>
            <br></br>
          </div>
          <div className="condition">
            <h2>Conditions d'autorisation de soutenance</h2>
            <hr></hr>
            <p className="color-blue">
              L'autorisation de soutenance est conditionnée à la validation des{" "}
              <span className="gras">prérequis de formation</span> suivants, à
              la date de soutenance :
            </p>
            <br></br>
            <p className="color-blue">
              Au minimum 1 publication acceptée et 1 publication soumise
              (l'accusé de réception du manuscrit de la part de l'éditeur et le
              manuscrit lui-même faisant foi), ou un dépôt de brevet.
            </p>
            <br></br>
            <p className="color-blue">
              Au minimum 1 Communication Orale du doctorant dans un congrès
              national ou international
            </p>
            <br></br>
            <p className="color-blue">
              La validation d'un niveau{" "}
              <span className="gras">B2 en langue anglaise</span> (TOEIC - score
              750, TOEFL IBT - score 80 ou toute autre certification d'un niveau
              équivalent).<br></br>(L'ED prend en charge les frais d'inscription
              à deux tests TOEIC ainsi que le coût des cours de formation de
              préparation à ces tests).
            </p>
            <br></br>
            <p className="color-blue">
              Avoir suivi une formation liée à "l'éthique de la Recherche et
              Intégrité scientifique" (ou équivalent)
            </p>
            <br></br>
            <p className="color-blue">
              Avoir suivi des formations comptabilisées :
            </p>
            <p className="color-blue">
              - sous forme de crédits{" "}
              <span className="gras">(minimum 6 crédits)</span> pour les
              étudiants inscrits <span className="gras">avant</span> l'année
              scolaire 2021-2022
            </p>
            <p className="color-blue">
              - sous forme d'heures de formation{" "}
              <span className="gras">(minimum 80h)</span> pour les étudiants
              inscrits <span className="gras">à partir</span> de l'année
              scolaire 2021-2022
            </p>
            <br></br>
            <br></br>
            <p className="color-blue">
              Note : par décision du Conseil de l'ED en date du 17 janvier 2018,
              les thèses "par articles" (collection des publications sans texte
              rajouté) ne sont pas autorisées
            </p>
            <br></br>
            <br></br>
            <p className="color-blue">
              Le catalogue des formations proposées par l'Ecole doctorale en
              lien avec l'École des Docteurs peut être trouvé en cliquant ICI.
            </p>
            <br></br>
            <br></br>
            <br></br>
          </div>
          <div className="compatibilite">
            <h2>
              Comptabilité des formations pour les étudiants inscrits avant
              l'année 2021-2022 :
            </h2>
            <hr></hr>
            <br></br>
            <p className="color-blue">
              Chaque doctorant devra avoir obtenu un{" "}
              <span className="gras">
                minimum de 6 crédits à la fin de sa thèse
              </span>{" "}
              pour pouvoir être autorisé à soutenir une thèse. Le détail des
              formations donnant lieu à crédit est indiqué plus-bas.
            </p>
            <br></br>
            <p className="color-blue">
              Pour les doctorants en co-tutelle de thèse, le nombre de crédits
              demandé est proportionnel à la durée de leur séjour au sein du
              laboratoire toulousain.
            </p>

            <br></br>
            <p className="color-blue">
              Il est demandé qu'au moins 2 crédits proviennent de formations
              préparant à l'insertion professionnelle.
            </p>
            <br></br>
            <p className="color-blue">
              Cas particuliers des doctorants bénéficiant d'une convention{" "}
              <span className="gras">CIFRE :</span>
              <br></br>ils ne sont pas tenus de valider les 2 crédits
              obligatoires provenant de formations professionnalisantes. Ils
              doivent donc obtenir au minimum{" "}
              <span className="gras">4 crédits</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormationEnTheseScreen;
