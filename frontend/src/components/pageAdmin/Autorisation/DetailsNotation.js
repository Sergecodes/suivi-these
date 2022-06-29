import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { critères } from "../../../constants/Constant";

const DetailsNotation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { etudiantInfo } = location.state;
  const notes = [2, 3, 4, 5, 1, 9, 6, 8];
  return (
    <section className="my-3">
      <div>
        <p className="fs-5 text-center">
          Details sur la notation de l'etudiant <span className="fw-bold">{etudiantInfo.nom}</span>{" "}
          de matricule <span className="fw-bold">{etudiantInfo.matricule}</span>
        </p>
        <p className="fs-5 text-center">
          Email jury: <span className="fw-bold">{etudiantInfo.jury}</span>
        </p>
      </div>

      {critères.map((elt, index) => {
        return (
          <div key={elt.id} >
            <div className="d-flex justify-content-around align-items-center row " style={{fontSize:"17px"}}>
              <p className="col-8 text-center " style={{fontStyle:"italic"}}>
                {elt.nom}
              </p>
              <p className="col-2 fw-bold">{notes[index]}</p>
            </div>
          </div>
        );
      })}
      <p className="fw-bold text-center my-2 fs-5">
        Total: {etudiantInfo.score}
      </p>
      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btnEmpty "
          onClick={() => navigate("/acteur/admin/notes-lecture")}
        >
          Retour
        </button>
      </div>
    </section>
  );
};

export default DetailsNotation;
