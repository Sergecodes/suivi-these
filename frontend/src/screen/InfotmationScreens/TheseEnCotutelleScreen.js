import React from "react";
import "../../Styles/informations.css";
import Header from "../Header";
import Footer from "../Footer";

function TheseEnCotutelleScreen() {
  return (
    <>
      <Header />
      <div className="informationScreen my-2">
        <div className="container">
          <div className="row">
            <h2>Co-tutelle de thèse (ED 482)</h2>
            <br></br>
            <br></br>
            <hr></hr>
            <h4>Présentation</h4>
            <p>
              La co-tutelle est une procédure permettant d’instaurer et/ou de
              renforcer une coopération scientifique entre des équipes de
              recherche françaises et étrangères. Le doctorant en co-tutelle
              réalise ses travaux de recherche sous la responsabilité de deux
              directeurs de thèse, l’un d’un établissement Français et l’autre
              d’un établissement étranger.
            </p>
            <br></br>
            <p>
              L’étudiant est inscrit dans les deux établissements mais
              s’acquitte des droits d’inscription et de scolarité dans un seul
              des deux établissements. Sauf exception autorisée par l'UPS
              (service des Relations Internationales), les droits d'inscription
              devront être payés au moins une fois à l'UPS. Le doctorant
              effectue ses recherches dans les deux pays, par périodes
              alternées, selon un calendrier précis. La thèse donne lieu à une
              soutenance unique reconnue par les deux pays.
            </p>
            <br></br>
            <h4>Réglementation</h4>
            <br></br>
            <p>
              En France, les thèses en cotutelle sont régies par{" "}
              <span className="color-orange">
                l’arrêté du 25 mai 2016 relatif à la formation doctorale (site
                de legifrance.fr).
              </span>
            </p>
            <p>
              Une <span className="color-orange">lettre de cadrage</span> a été
              éditée à ce propos par l'UPS.
            </p>
            <br></br>
            <h4>Démarches à effectuer</h4>
            <br></br>
            <p>Pour réaliser une thèse en co-tutelle, l’étudiant(e) doit :</p>
            <br></br>
            <p>
              - être inscrit(e) ou autorisé(e) à s’inscrire en thèse à
              l’Université Toulouse 3- Paul Sabatier (Cf. onglet
              inscription/réinscription pour les conditions d’admission),
            </p>
            <p>
              - disposer d’un financement d’un montant minimal de 1200 euros
              nets par mois pour les périodes de travail effectuées à Toulouse.
            </p>
            <br></br>
            <h4>Convention de cotutelle</h4>
            <br></br>
            <p>
              La cotutelle de thèse est matérialisée par une convention, signée
              par le Président de l’Université Toulouse 3 - Paul Sabatier et par
              son homologue à l’étranger, au plus tard à la fin de la première
              année d’inscription. La convention est établie pour 3 ans en
              équivalent temps plein consacré à la recherche. Si la durée de la
              thèse dépasse celle prévue dans la présente convention, un avenant
              devra obligatoirement être conclu. La convention de cotutelle
              devra être mise en place le plus rapidement possible, si possible
              au cours de la première année de co-tutelle.
            </p>
            <br></br>
            <h4>Les cotutelles sont à établir en 6 exemplaires.</h4>
            <br></br>
            <h4>POUR l'UPS</h4>
            <br></br>
            <h4>Documents téléchargeables :</h4>
            <div className="container" style={{ paddind: "10px" }}>
              <div className="row">
                <ul className="">
                  <li className="color-orange">
                    {" "}
                    la procédure relative aux cotutelles votée par le CAC
                  </li>
                  <li className="color-orange">
                    {" "}
                    un vademecum élaboré par le SAJE
                  </li>
                  <li className="color-orange">
                    le modèle de convention bilingue français-anglais
                  </li>
                  <li className="color-orange">
                    le modèle de convention (version française)
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <h4>Remarques</h4>
          <p>
            Tant que la convention de co-tutelle n'est pas signée, l'étudiant
            sera inscrit en simple thèse de l'UPS. Une fois l'accord de
            co-tutelle signé, l'étudiant sera inscrit les années suivantes en
            co-tutelle. Pour tout établissement d‘une convention de co-tutelle
            entre l’Université Toulouse 3- Paul Sabatieret un partenaire
            étranger, l’étudiant devra effectuer ses recherches en France au
            minimum pendant un an (par périodes alternées ou en une seule fois),
          </p>
          <br></br>
          <p>
            Des aides à la mobilité peuvent être attribuées aux étudiants
            inscrits à l’Université Toulouse 3- Paul Sabatier et l’INSA pour
            faciliter les déplacements entre les établissements partenaires.
            L’Appel d’offre a lieu tous les deux ans. Prochain appel d’offre :
            vers Avril 2018.
          </p>
          <br></br>
          <h4>Contacts</h4>
          <p>
            Pour tout renseignement ou information relative aux co-tutelles,
            merci de contacter Eric Benoist, directeur de l’ED SdM et
            responsable du volet international à l’ED SdM.
          </p>
          <br></br>
          <p>
            Eric Benoist : 05 61 55 64 80 :{" "}
            <span className="color-orange">eric.benoist@univ-tlse3.fr</span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TheseEnCotutelleScreen;
