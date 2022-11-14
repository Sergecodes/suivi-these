import React from "react";
import "../../Styles/informations.css";
import Header from "../Header";
import Footer from "../Footer";

function Presentation() {
  return (
    <>
      <Header />
      <div className="informationScreen my-2">
        <div className="container">
          <div className="row">
            <h1 className="color-orange">Présentation de l'Ecole Doctorale </h1>
            <div className="container" style={{ textAlign: "left" }}>
              <h2 className="color-orange">A propos</h2>
              <hr></hr>
              <p>
              L'École des hautes études en sciences, technologies et géosciences (CRFD / STG) est un établissement de l'Université de Yaoundé 1 créé en 2013 par arrêté du ministre de l'Enseignement supérieur avec pour objectifs de professionnaliser, moderniser et valoriser les travaux de recherche et d'aider les doctorants à développer des compétences et à construire leur projet professionnel. Il est chargé de l'encadrement et de la formation des étudiants en Master II et en doctorat. Le CRFD/STG est dirigé par un coordinateur qui est placé sous l'autorité du Recteur de l'Université de Yaoundé I.
              </p>
            </div>
            {/* <div className="secretariat-ed container">
              <h2 className="color-orange">Secrétariat de l'école doctorale</h2>
              <hr></hr>
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
                https://ed-sdm.univ-toulouse.fr
              </p>
            </div> */}
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
                  spectre scientifique le justifient, les équipes de recherche
                  qui la composent peuvent être réparties entre plusieurs Ecoles
                  Doctorales.
                </li>
                <li>
                L'instance de consultation et de validation des dossiers scientifiques et administratifs importants du CRFD/STG est le Conseil Scientifique et Pédagogique du Centre, conseil dont les membres (23) sont nommés par décision du Recteur de l'Université de Yaoundé I. Le conseil se réunit sur convocation du Coordonnateur du CRFD/STG chaque fois que celui-ci le juge nécessaire.
                Le doctorat peut être poursuivi dans l'une des Unités de Recherche et de Formation Postgraduée (URFD) qui abritent chacune un ou plusieurs laboratoires de recherche.
                </li>
                <li>
                Le CRFD / STG a sous son autorité cinq (5) Unités de Recherche et de Formation dirigées chacune par un Coordinateur. Chaque unité regroupe un certain nombre de laboratoires gérés par des équipes de recherche.
                </li>
              </ol>
            </div>
            <div className="programme-daction-ed">
              <h2>Programme d'actions des écoles doctorales</h2>
              <hr></hr>
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
                  s'assurent de la qualité de l'encadrement des doctorants par
                  les unités et équipes de recherche, et veiller au respect de
                  la charte des thèses de l'UY1 de manière à
                  mettre les doctorants en mesure de préparer et de soutenir
                  leur thèse dans les meilleures conditions ;
                </li>
                <li>
                  proposent aux doctorants les formations utiles à leur projet
                  de recherche et à leur projet professionnel ainsi que les
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
                  organisent un suivi de l'insertion professionnelle des
                  docteurs et aussi de l'ensemble des doctorants qu'elles ont
                  accueilli ;
                </li>
                <li>
                  apportent une ouverture européenne et internationale, en
                  particulier par la promotion des co-tutelles internationales
                  de thèse
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Presentation;
