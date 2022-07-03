import React from 'react';
import { useSelector } from 'react-redux';
import {AiOutlineWarning} from "react-icons/ai";
import FileUpload from "../upload/FileUpload";
import { CategorieFichierThese } from '../../../constants/Constant';


const SecondStep = () => {
    const files= useSelector(state=>state.theseFilesUpload);
  return (
    <section className=" mt-3 step" >
      <h2 >Tous vos fichiers doivent ètre scannés et enregistrés au format pdf (PDF)</h2>
       <div className="row mt-4">
        <div className=" col-6 col-md-4   stepFile mb-3">
             <FileUpload name={CategorieFichierThese.THESE} niveau="these" />
             <p>{files.these.name}</p>
          </div>
          <div className=" col-6 col-md-4  stepFile mb-3">
             <FileUpload name={CategorieFichierThese.RESUME_THESE} niveau="these" />
             <p>{files.resume.name}</p>
          </div>
          <div className=" col-6 col-md-4  stepFile mb-3">
             <FileUpload name={CategorieFichierThese.COUVERTURE} niveau="these" />
             <p>{files.couverture.name}</p>
          </div>
          <div className=" col-6 col-md-4  stepFile mb-3">
             <FileUpload name={CategorieFichierThese.RAPPORT_ENC} niveau="these" />
             <p>{files.rapportEncadreur.name}</p>
          </div>
         
          <div className=" col-6 col-md-4  stepFile mb-3">
             <FileUpload name={CategorieFichierThese.LETTRE_ENC} niveau="these" />
             <p>{files.lettreEncadreur.name}</p>
          </div>
          <div className=" col-6 col-md-4  stepFile mb-3">
             <FileUpload name={CategorieFichierThese.LETTRE_CHEF} niveau="these" />
             <p>{files.lettreChefDepartement.name}</p>
          </div>
          
         
       </div>
       <p className="warning"><AiOutlineWarning className="me-2"/>Attention le depot de dossier se fait une seule fois!!!</p>
    </section>
  )
}

export default SecondStep