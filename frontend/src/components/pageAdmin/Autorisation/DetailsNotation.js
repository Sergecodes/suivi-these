import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const DetailsNotation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { etudiantInfo } = location.state;
  const jury = etudiantInfo.jury;
  console.log(etudiantInfo);

  const handleNotes = (notes) => {
    let notesMemoire = [];
    for (let criteria in notes) {
      notesMemoire.push({
        critere: criteria,
        note: notes[criteria],
      });
    }
    return notesMemoire;
  };

  const handleTotal = (notes) => {
    let total = 0;
    for (let criteria in notes) {
      total += notes[criteria];
    }
    return total;
  };

  return (
    <section className="my-3">
      <Link to="/acteur/admin/notes-lecture">
        <div className="details fs-4 ps-3">
          <BsArrowLeft className="me-1" />
          <span>Retour</span>
        </div>
      </Link>
      <div>
        <p className="fs-5 text-center">
          Details sur la notation de l'etudiant{" "}
          <span className="fw-bold">{etudiantInfo.nom}</span> de matricule{" "}
          <span className="fw-bold">{etudiantInfo.matricule}</span>
        </p>
        <p className="fs-5 text-center">
          Nom et prenom du jury :{" "}
          <span className="fw-bold">
            {jury.nomJury + " " + jury.prenomJury}{" "}
          </span>{" "}
          <br />
          Email jury: <span className="fw-bold">{jury.emailJury}</span>
        </p>
      </div>

      {handleNotes(jury.notes).map((elt, index) => {
        return (
          <div key={index}>
            <div
              className="d-flex justify-content-around align-items-center row "
              style={{ fontSize: "17px" }}
            >
              <p className="col-8 text-center " style={{ fontStyle: "italic" }}>
                {elt.critere}
              </p>
              <p className="col-2 fw-bold">{elt.note}</p>
            </div>
          </div>
        );
      })}
      <p className="fw-bold text-center my-2 fs-5">
        Total: {handleTotal(jury.notes)}
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
