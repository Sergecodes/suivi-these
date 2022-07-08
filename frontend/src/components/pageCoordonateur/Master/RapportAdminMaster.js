import { useLocation } from "react-router-dom";

const RapportAdminMaster = () => {
  const location = useLocation();
  const { etudiantInfo } = location.state;
  const rapportHtml = (
    <div dangerouslySetInnerHTML={{ __html: etudiantInfo.rapport }}></div>
  );

  return (
    <section className="rapportPresoutenance px-3 my-4" style={{backgroundColor:"white"}}>
      <div className="d-flex justify-content-between align-items-center rapportHeader row">
        <div className="col-4 text-center">
          <p>REPUBLIQUE DU CAMEROUN</p>
          <p>--------</p>
          <p>PAIX-TRAVAIL-PATRIE</p>
          <p>--------</p>
          <p>UNIVERSITE DE YAOUNDE 1</p>
          <p>--------</p>
          <p>
            CENTRE DE RECHERCHE ET DE FORMATION DOCTORALE EN SCIENCES
            TECHNOLOGIES ET GEOSCIENCES
          </p>
          <p>--------</p>
          <p>BP 812 YAOUNDE</p>
          <p>--------</p>
        </div>
        <div className="col-4 d-flex justify-content-center logoUy1 ">
          <img
            src="https://upload.wikimedia.org/wikipedia/fr/2/2a/Blason_univ_Yaound%C3%A9_1.png"
            alt="logo uy1"
          />
        </div>
        <div className="col-4 text-center">
          <p>REPUBLIC OF CAMEROON</p>
          <p>--------</p>
          <p>PEACE-WORK-FATHERLAND</p>
          <p>--------</p>
          <p>UNIVERSITY OF YAOUNDE 1</p>
          <p>--------</p>
          <p>
            CENTRE DE RECHERCHE ET DE FORMATION DOCTORALE EN SCIENCES
            TECHNOLOGIES ET GEOSCIENCES
          </p>
          <p>--------</p>
          <p>BP 812 YAOUNDE</p>
          <p>--------</p>
        </div>
      </div>
      <p className="fw-bold">REF N°_____________/UY1/CRFD/22</p>
      <div
        className="d-flex justify-content-end fw-bold row"
        style={{ width: "100%" }}
      >
        <div className="col-4 text-center" style={{ lineHeight: 0.9 }}>
          <p>Yaoundé le 05 juilles 2022</p>
          <p>
            LE COORDONATEUR DU CENTRE DE RECHERCHE ET DE FORMATION DOCTORALE EN
            SCIENCES TECHNOLOGIES ET GEOSCIENCES
          </p>
          <p>
            A <br /> MONSIEUR, LE COORDONATEUR DE L'UNITE S/C DE LA VOIE
            HIERARCHIQUE
          </p>
        </div>
      </div>
      <p>
        <span className="fw-bold" style={{ borderBottom: "1px solid black" }}>
          Objet:
        </span>{" "}
        Autorisation de soutenance de mémoire de master de{" "}
        <span className="fw-bold">{etudiantInfo.nom}</span>
      </p>
      <p className="ms-3 fw-bold">Monsieur le Coordonateur de l'unité</p>
      <div> {rapportHtml}</div>
      <div className="d-flex justify-content-end fw-bold mt-2">
        <p>Le coordonateur du CRFD-STG</p>
      </div>
    </section>
  );
};

export default RapportAdminMaster;
