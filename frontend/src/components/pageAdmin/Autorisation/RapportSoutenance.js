import { useState } from "react";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";


const RapportSoutenance = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();
  const navigate = useNavigate();
  const { etudiantInfo } = location.state;
  const [value, setValue] = useState("");

  const handleConfirm = () => {
    console.log("Value: ", value);

    axios.post('/donner-avis', {
      dossier: etudiantInfo.idDossier,
      rapport: value,
      type: "Autorisation de soutenance",
      donnePar: user.id,
      donneParModel: 'Admin',
      destinataireModel: 'Coordonateur'
    })
      .then(res => {
        console.log(res);
        toast.success("Rapport envoyé au Coordonateur avec succes!", { hideProgressBar: true });

        // Close toasts after x seconds and go to previous page
        setTimeout(() => {
          toast.dismiss();
          navigate("/acteur/admin/notes-lecture");
        }, 3000);
      })
      .catch(err => {
        console.error(err);
        toast.error("Une erreur est survenue!", { hideProgressBar: true });
      });
  }

  return (
    <>
      <section className="my-5">
        <ToastContainer />
        <div className="row d-flex justify-content-center">
          <div
            className="col-12 col-md-9 py-3"
            style={{ backgroundColor: "white" }}
          >
            <h4 className="text-center">Autorisation de soutenance</h4>
            <p className="text-center fs-6">
              Vous redigez la lettre d'autorisation de soutenance de l'étudiant{" "}
              <strong>{etudiantInfo.nom}</strong>
            </p>
            <ReactQuill theme="snow" value={value} onChange={setValue} />
            <div className="d-flex justify-content-between mx-2 my-3">
              <button
                type="button"
                className="btn btnEmpty"
                onClick={() => navigate("/acteur/admin/notes-lecture")}
              >
                Retour
              </button>
              <button type="button" className="btn btnFull" onClick={handleConfirm}>
                Confirmer
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RapportSoutenance;
