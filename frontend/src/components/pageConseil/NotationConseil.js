import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";


const NotationConseil = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { etudiantInfo } = location.state;

  const handleConfirm = () => {
    
  }

  return (
    <>
      <section className="my-5">
        <div className="row d-flex justify-content-center">
          <div
            className="col-12 col-md-9 py-3"
            style={{ backgroundColor: "white" }}
          >
            <h4 className="text-center">Avis memoire etudiant</h4>
            <p className="text-center fs-6">
              Veuillez rediger votre avis au sujet de la thèse de l'étudiant{" "}
              <strong>{etudiantInfo.noms}</strong>
            </p>
            <ReactQuill theme="snow" />
            <div className="d-flex justify-content-between mx-2 my-3">
              <button
                type="button"
                className="btn btnEmpty"
                onClick={() => navigate("/acteur/conseil/dashboard")}
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

export default NotationConseil;
