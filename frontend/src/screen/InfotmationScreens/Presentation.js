import React from "react";
import "../../Styles/informations.css";

function Presentation() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <h1 className="color-orange">Présentation de l'Ecole Doctorale </h1>
          <hr></hr>
          <div className="contact-box">
            <h2 className="color-orange">Contact</h2>
            <hr></hr>
            <p>
              Mme <span className="color-orange">Agnès Labande</span>, Chargée
              de Recherche CNRS, membre
              <span>Mr Eric Benoist</span>, Professeur UPS, Directeur.
            </p>
            <p>
              Mme <span className="color-orange">Agnès Labande</span>, Chargée
              de Recherche CNRS, membre
              <span>Mr Bernard Viguier</span>, Professeur INP,
              Directeur-Adjoint.
            </p>
            <p>
              Mme <span className="color-orange">Agnès Labande</span>, Chargée
              de Recherche CNRS, membre Mr <span>Joël Douin</span>, Directeur de
              Recherche CNRS, Directeur-Adjoint.
            </p>
            <p>
              Mme <span className="color-orange">Agnès Labande</span>, Chargée
              de Recherche CNRS, membre du bureau.
            </p>
            <p>
              Mr <span className="color-orange"> Jérôme Cuny</span>, Maître de
              Conférences UPS, membre du bureau.
            </p>
          </div>
          <div className="secretariat-ed">
            <h2 className="color-orange">Secrétariat de l'école doctorale</h2>
            <hr></hr>
            <p>
              <p>
                {" "}
                Mme <span className="color-orange">Soraya Berkouk</span>
              </p>
              <p className="site color-orange">edsdm@univ-tlse3.fr</p>
              <h3> Heures d'ouverture au public:</h3>
              <p>lundi et jeudi : de 10h à 12h et de</p>
              <p style={{ color: "green" }}>
                14h à 16h Secrétariat de l'école doctorale Science de la matière
                Maison de la Recherche et de la Valorisation
              </p>
              <p>porte AR023</p>
              <p> Université Toulouse III </p>
              <p> 118, route de Narbonne</p>
              <p>31062 Toulouse Cedex </p>
              <p>
                {" "}
                <span style={{ color: "green" }}>Tél: 05 62 25 00 64</span>{" "}
                (from abroad : 0033 5 62 25 00 64)
              </p>
              <p className="site color-orange">
                {" "}
                https://ed-sdm.univ-toulouse.fr
              </p>
            </p>
          </div>
          <div className="Missions">
            <h2>En Bref : Missions des Ecoles Doctorales</h2>
            <hr></hr>
            <ol>
              <li>
                Organiser la formation des doctorants et les préparer à leur
                insertion professionnelle
              </li>
              <li>
                Veiller à l'enrichissement scientifique général des doctorants
              </li>
              <li>
                Concourir à la mise en cohérence et à la visibilité
                internationale de l'offre de formation doctorale des
                établissements, ainsi qu'à la structuration des sites
              </li>
              <li>
                Traiter les dossiers de thèse (choix des rapporteurs,
                autorisations de soutenance)
              </li>
              <li>Répartir les allocations de thèse doctorales</li>
            </ol>
          </div>
          <div className="composotion-ed">
            <h2>Composition de l'école doctorale</h2>
            <hr></hr>

            <ol>
              <li>
                L'Ecole Doctorale est constituée de tous les
                enseignants-chercheurs, chercheurs et de toute personne
                susceptible de diriger une thèse de doctorat, membres d'une
                unité de recherche ou laboratoire reconnu à la suite d'une
                évaluation nationale.
              </li>
              <li>
                Une unité de recherche ne participe qu'à une seule Ecole
                Doctorale. Toutefois, si la taille de l'unité et l'étendue du
                spectre scientifique le justifient, les équipes de recherche qui
                la composent peuvent être réparties entre plusieurs Ecoles
                Doctorales.
              </li>
              <li>
                Une personne susceptible de diriger ou co-diriger une thèse de
                doctorat ne peut être rattachée qu'à une seule Ecole doctorale,
                sauf pour l'inscription d'un doctorant à l'Ecole doctorale
                Aéronautique et Astronautique. En effet, cette Ecole Doctorale
                joue le rôle de seconde école doctorale de rattachement et ne
                dispose d'aucun potentiel de recherche en propre, aucune
                personne ne pouvant être rattachée uniquement à cette Ecole
                Doctorale.
              </li>
              <li>
                Tous les doctorants dont le directeur de thèse est membre de
                l'Ecole Doctorale Sciences de la Matière sont inscrits dans
                l'Ecole Doctorale Sciences de la Matière.
              </li>
              <li>
                Les 16 structures de recherche rattachées en totalité ou partie
                à l'Ecole Doctorale Sciences de la Matière représentent un
                potentiel d'encadrement de 500 personnes dont 350 sont
                titulaires de l'Habilitation à diriger des Recherches (HDR).
                Environ 320 doctorants sont inscrits dans l'Ecole Doctorale, ce
                qui représente un flux annuel d'inscription d'environ 80 à 90
                nouveaux doctorants
              </li>
            </ol>
          </div>
          <div className="programme-daction-ed">
            <h2>Programme d'actions des écoles doctorales</h2>
            <hr></hr>
            <h4>
              Le programme d'actions des Ecoles Doctorales est défini par
              l'arrêté du 25 mai 2016. Dans ce cadre, les Ecoles Doctorales :
            </h4>
            <ol>
              <li>
                mettent en œuvre une politique de choix des doctorants fondée
                sur des critères explicites et publics ;
              </li>
              <li>
                organisent, dans le cadre de la politique des établissements,
                l'attribution des financements qui lui sont dévolus, notamment
                les allocations de recherche ;
              </li>
              <li>
                s'assurent de la qualité de l'encadrement des doctorants par les
                unités et équipes de recherche, et veiller au respect de la
                charte des thèses de l'Université de Toulouse de manière à
                mettre les doctorants en mesure de préparer et de soutenir leur
                thèse dans les meilleures conditions ;
              </li>
              <li>
                proposent aux doctorants les formations utiles à leur projet de
                recherche et à leur projet professionnel ainsi que les
                formations nécessaires à l'acquisition d'une culture
                scientifique élargie. Ces formations doivent non seulement
                permettre de préparer les docteurs au métier de chercheur dans
                le secteur académique et dans l'entreprise mais, plus
                généralement à tout métier requérant les compétences acquises
                lors de la formation doctorale. Les écoles doctorales doivent
                constituer un dispositif d'appui à l'insertion professionnelle
                des docteurs qui peut comporter un bilan des compétences
                acquises ;
              </li>
              <li>
                organisent les échanges scientifiques et intellectuels entre
                doctorants ;
              </li>
              <li>
                organisent un suivi de l'insertion professionnelle des docteurs
                et aussi de l'ensemble des doctorants qu'elles ont accueilli ;
              </li>
              <li>
                apportent une ouverture européenne et internationale, en
                particulier par la promotion des co-tutelles internationales de
                thèse
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Presentation;
