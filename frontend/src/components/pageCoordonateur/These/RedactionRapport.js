import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";

const RedactionRapport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { etudiantInfo } = location.state;

  const [value, setValue] = useState("");
  return (
    <section className="my-5">
      <div className="row d-flex justify-content-center">
        <div
          className="col-12 col-md-9 py-3"
          style={{ backgroundColor: "white" }}
        >
          <h4 className="text-center">Rapport d'audition</h4>
          <p className="text-center fs-6">
            Vous redigez le rapport d'audition concernant l'étudiant{" "}
            <strong>{etudiantInfo.nom}</strong>
          </p>
          <ReactQuill theme="snow" value={value} onChange={setValue} />
          <div className="d-flex justify-content-between mx-2 my-3">
            <button
              type="button"
              className="btn btnEmpty"
              onClick={() => navigate("/acteur/coordonateur/audition")}
            >
              Retour
            </button>
            <button type="button" className="btn btnFull">
              Confirmer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RedactionRapport;
