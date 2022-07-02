import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {BsPencilFill} from "react-icons/bs"

const ViewTheseEtudiant = () => {
  const location = useLocation();
  const { etudiantInfo } = location.state;

  return (
    <section className="d-flex flex-column align-items-center">
      <h4>
        Ici nous allons pouvoir visualiser le memoire de l'étudiant de thèse
      </h4>

      <Link
        to="/acteur/conseil/notation"
        state={{
          etudiantInfo: {
            matricule: etudiantInfo.matricule,
            noms: etudiantInfo.noms,
            idDossier: etudiantInfo.idDossier,
          },
        }}
      >
        <button className="btn autorisationButton">
          <BsPencilFill className="me-1" /> Notation
        </button>
      </Link>
    </section>
  );
};

export default ViewTheseEtudiant;
