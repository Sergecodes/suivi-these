import { useState } from "react";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment';
import { criteres } from "../../constants/Constant";
import { useLocation, useNavigate } from "react-router-dom";
import PdfViewer from "../common/PdfViewer";

moment.locale('fr');


const NotationMaster = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();
  const navigate = useNavigate();
  const { etudiantInfo } = location.state;
  const [notation, setNotation] = useState(criteres);
  const [somme, setSomme] = useState(0);

  function calculSomme(notes) {
    let temp = 0;
    for (let i in notes) {
      temp = temp + parseInt(notes[i].note, 10);
    }
    return temp;
  }

  const handleChange = (e, index) => {
    let newNotation = notation.slice();
    newNotation[index].note = e.target.value;
    setNotation(newNotation);
    setSomme(calculSomme(newNotation));
  };
  
  const handleSubmit = () => {
    let notes = (function () {
      let result = {};
      for (let note of notation) {
        result[note.nom] = note.note;
      }
      
      return result;
    })();

    Promise.all([
      axios.post('/jury/noter-dossier', {
        notes,
        dossier: etudiantInfo.idDossier,
      }),
      // Send dossier to admin
      axios.post('/envoyer-dossier', {
        dossier: etudiantInfo.idDossier,
        envoyePar: user.id,
        envoyeParModel: 'Jury',
        destinataireModel: 'Admin'
      })
    ])
      .then(results => {
        console.log(results);

        // Default autoclose delay is 5000ms (5s)
        toast.success("Succes!", { hideProgressBar: true });

        // Close toasts after x seconds and go to previous page
        // remove item in case it was in localStorage so as to get updated info
        setTimeout(() => {
          toast.dismiss();
          navigate('/acteur/jury/notation');
        }, 3000);
      })
      .catch(err => {
        toast.error("Une erreur est survenue", { hideProgressBar: true });
        console.error(err);
      })
  }

  return (
    <>
      <ToastContainer />
      <section className="notation">
        <p>Vous ètes sur le point de noter l'étudiant {etudiantInfo.noms} </p>
        <PdfViewer />
        <div className="my-5" style={{ width: "75%" }}>
          <div className="notationHeader">
            <p>MATRICULE: {etudiantInfo.matricule}</p>
            <p>NOTE DE LECTURE /60</p>
            <p>DATE: {moment().format('dddd, D MMMM YYYY')}</p>
          </div>
          <hr />
          <div className="notationHeader">
            <p>
              Quelle mention accorderez vous par rapport à <br /> 
              Score the viva voce on the following basis
            </p>
            <p>Note/mark</p>
          </div>
          <div>
            {notation.map((critère, index) => {
              return (
                <div key={critère.id} className="notationHeaderElements">
                  <p>{critère.nom}</p>
                  <input
                    type="number"
                    min="0"
                    max={critère.max}
                    required={true}
                    defaultValue={critère.note}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="my-3 fs-5">Note totale : {somme} / 60</div>
        <div className=" d-flex justify-content-center">
          <button className="btn submitNotation" type="button" onClick={handleSubmit}>
            Soumettre notation
          </button>
        </div>
      </section>
    </>
  );
};

export default NotationMaster;
