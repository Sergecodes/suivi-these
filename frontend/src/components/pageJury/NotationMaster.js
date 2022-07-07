import { useState } from "react";
import axios from 'axios';
import { Modal } from 'antd';
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment';
import { criteres } from "../../constants/Constant";
import { useLocation, useNavigate } from "react-router-dom";
import PdfViewer from "../common/PdfViewer";
import { Link } from "react-router-dom";
import {BsArrowLeft } from "react-icons/bs";

const { confirm } = Modal;

moment.locale('fr');


const NotationMaster = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();
  const navigate = useNavigate();
  const { etudiantInfo } = location.state;
  const [notation, setNotation] = useState(criteres);
  const [somme, setSomme] = useState(0);
  const memoireEtudiant = etudiantInfo.dossier.fichiers.find(fichier => fichier.categorie === "Mémoire");
  console.log(memoireEtudiant)

  function calculSomme(notes) {
    let temp = 0;
    for (let i in notes) {
      temp = temp + parseInt(notes[i].note, 10);
    }
    return temp;
  }

  const handleChange = (e, index) => {
    let newNotation = notation.slice();
    newNotation[index].note = parseInt(e.target.value, 10);
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

    confirm({
      title: "Soumettre cette notation?",
      icon: <AiOutlineExclamationCircle style={{ color: "gold" }} />,
      okText: "Oui",
      cancelText: "Non",
      async onOk() {
        return Promise.all([
          axios.post('/jury/noter-dossier', {
            notes,
            idDossier: etudiantInfo.dossier.id,
          }),
          // Send dossier to admin
          axios.post('/envoyer-dossier', {
            dossier: etudiantInfo.dossier.id,
            envoyePar: user.id,
            envoyeParModel: 'Jury',
            destinataireModel: 'Admin'
          })
        ])
          .then(results => {
            console.log(results);
            toast.success("Succes!", { hideProgressBar: true });
    
            setTimeout(() => {
              toast.dismiss();
              navigate('/acteur/jury/dashboard');
            }, 3000);
          })
          .catch(err => {
            toast.error("Une erreur est survenue", { hideProgressBar: true });
            console.error(err);
          })
      },
      onCancel() {},
    });
  }
  
  return (
    <>
      <ToastContainer />
      <Link to="/acteur/jury/dashboard">
        <div className="details fs-4 ms-3 mt-3">
          <BsArrowLeft className="me-1" />
          <span>Retour</span>
        </div>
      </Link>
      <section className="notation">
        <p>Vous ètes sur le point de noter l'étudiant {etudiantInfo.noms} </p>
        <div className=" py-4 px-5" style={{width:"100%"}}>
            <PdfViewer url={memoireEtudiant.url} height="800px" />
        </div>
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
          <button className="btn btnFull" type="button" onClick={handleSubmit}>
            Soumettre notation
          </button>
        </div>
      </section>
    </>
  );
};

export default NotationMaster;
