import React from 'react';
import { useSelector } from 'react-redux';
import {AiOutlineWarning} from "react-icons/ai";
import FileUpload from "../upload/FileUpload";
import { CategorieFichierMaster } from '../../../constants/Constant';
//import { addMemoire,addAttestationLicense,addDroitsUniversitaires, addRapportPresoutenance } from '../../../redux/filesUploadSlice';


const SecondStep = () => {
    const files= useSelector(state=>state.masterFilesUpload);
  return (
    <section className=" mt-3 step" >
      <h2 >Tous vos fichiers doivent ètre scannés et enregistrés au format pdf (PDF)</h2>
       <div className="row mt-4">
        <div className=" col-6 col-md-4   stepFile mb-3">
             <FileUpload name={CategorieFichierMaster.MEMOIRE} niveau="master" />
             <p>{files.memoire.name}</p>
          </div>
          <div className=" col-6 col-md-4  stepFile mb-3">
             <FileUpload name={CategorieFichierMaster.RAPPORT_PRESOUTIENT} niveau="master" />
             <p>{files.rapportPresoutenance.name}</p>
          </div>
          <div className=" col-6 col-md-4  stepFile mb-3">
             <FileUpload name={CategorieFichierMaster.CV} niveau="master" />
             <p>{files.cv.name}</p>
          </div>
          <div className=" col-6 col-md-4  stepFile mb-3">
             <FileUpload name={CategorieFichierMaster.ATTEST_INSCRIP} niveau="master" />
             <p>{files.attestationInscription.name}</p>
          </div>
         
          <div className=" col-6 col-md-4  stepFile mb-3">
             <FileUpload name={CategorieFichierMaster.LISTE_SELECT} niveau="master" />
             <p>{files.listeSelection.name}</p>
          </div>
          <div className=" col-6 col-md-4  stepFile mb-3">
             <FileUpload name={CategorieFichierMaster.FICHE_INSCRIP} niveau="master" />
             <p>{files.ficheInscription.name}</p>
          </div>
         
       </div>
       <p className="warning"><AiOutlineWarning className="me-2"/>Attention le depot de dossier se fait une seule fois!!!</p>
    </section>
  )
}

export default SecondStep