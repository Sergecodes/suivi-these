import React from 'react';
import { useSelector } from 'react-redux';
import {AiOutlineWarning} from "react-icons/ai";
import FileUpload from "../upload/FileUpload"
import { CategorieFichierMaster } from '../../../constants/Constant';
//import { addMemoire,addAttestationLicense,addDroitsUniversitaires, addRapportPresoutenance } from '../../../redux/filesUploadSlice';


const FirstStep = () => {
    const files= useSelector(state=>state.masterFilesUpload);
  return (
    <section className=" mt-3 step" >
      <h2 >Tous vos fichiers doivent ètre scannés et enregistrés au format pdf (PDF)</h2>
       <div className="row mt-4">
        <div className=" col-6 col-md-4   stepFile mb-3">
             <FileUpload name={CategorieFichierMaster.ACTE_NAISSANCE} niveau="master" />
             <p>{files.acteDeNaissance.name}</p>
          </div>
          <div className=" col-6 col-md-4  stepFile mb-3">
             <FileUpload name={CategorieFichierMaster.REL_NOTES_M1} niveau="master" />
             <p>{files.releveM1.name}</p>
          </div>
          <div className=" col-6 col-md-4  stepFile mb-3">
             <FileUpload name={CategorieFichierMaster.REL_NOTES_M2} niveau="master" />
             <p>{files.releveM2.name}</p>
          </div>
          <div className=" col-6 col-md-4  stepFile mb-3">
             <FileUpload name={CategorieFichierMaster.DROITS_UNIV} niveau="master" />
             <p>{files.droitsUniversitaires.name}</p>
          </div>
         
          <div className=" col-6 col-md-4  stepFile mb-3">
             <FileUpload name={CategorieFichierMaster.ATTEST_LIC} niveau="master" />
             <p>{files.attestationLicense.name}</p>
          </div>
       
       </div>
       <p className="warning"><AiOutlineWarning className="me-2"/>Attention le depot de dossier se fait une seule fois!!!</p>
    </section>
  )
}

export default FirstStep