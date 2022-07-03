import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import PdfViewer from "../common/PdfViewer"
const pdf = require("../../assets/images/image-pdf.jpg")

const VerificationMaster = () => {
  const location = useLocation();
  const {etudiantInfo} = location.state;
  const listeFichiers = etudiantInfo.dossier.fichiers;
  console.log(etudiantInfo);

  const handleSubmit = () => {
    const idEtudiant = etudiantInfo.dossier.etudiant.id;
    alert("requète soumise"+idEtudiant)
  }


  return (
    <section className="mx-3 my-3">
      <h4 className="text-center mb-2">Liste des fichiers de l'étudiant {etudiantInfo.noms}</h4>
      <div className="row">
        {
          listeFichiers.map(fichier=>{
            return(
              <div className="col-3" key={fichier.id}>
                <div className="mx-2 my-2" style={{border:"1px solid gray"}}>
                  <img src={pdf} alt="pdf image" style={{width:"100%", height:"80px"}}/>
                  <p className='fs-6 text-center fw-bold'>{fichier.categorie}</p>
                </div>
              </div>
            )
          })
        }
      </div>
      <PdfViewer />
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary my-5" type='button' onClick={handleSubmit}>VALIDER </button>
      </div>
    </section>
  )
}

export default VerificationMaster