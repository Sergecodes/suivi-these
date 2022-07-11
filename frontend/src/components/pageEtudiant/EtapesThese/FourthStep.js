import { useSelector } from 'react-redux';
import { AiOutlineWarning } from "react-icons/ai";
import FileUpload from "../upload/FileUpload";
import { CategorieFichierThese } from '../../../constants/Constant';


const FourthStep = () => {
   const files = useSelector(state => state.theseFilesUpload);
   
   return (
      <section className=" mt-3 step" >
         <h2>Tous vos fichiers doivent ètre scannés et enregistrés au format pdf (PDF)</h2>
         <div className="row mt-4">
            <div className=" col-6 col-md-4   stepFile mb-3">
               <FileUpload name={CategorieFichierThese.ATTEST_INSCRIP} niveau="these" />
               <p>{files.attestationInscription.name}</p>
            </div>
            <div className=" col-6 col-md-4  stepFile mb-3">
               <FileUpload name={CategorieFichierThese.ACTE_NAISSANCE} niveau="these" />
               <p>{files.acteDeNaissance.name}</p>
            </div>
            <div className=" col-6 col-md-4  stepFile mb-3">
               <FileUpload name={CategorieFichierThese.DIPLOME_BAC} niveau="these" />
               <p>{files.diplomeBaccalaureat.name}</p>
            </div>
            <div className=" col-6 col-md-4  stepFile mb-3">
               <FileUpload name={CategorieFichierThese.DIPLOME_LIC} niveau="these" />
               <p>{files.diplomeLicense.name}</p>
            </div>
            <div className=" col-6 col-md-4  stepFile mb-3">
               <FileUpload name={CategorieFichierThese.LISTE_SELECT} niveau="these" />
               <p>{files.listeSelection.name}</p>
            </div>
            <div className=" col-6 col-md-4  stepFile mb-3">
               <FileUpload name={CategorieFichierThese.FICHE_INSCRIP} niveau="these" />
               <p>{files.ficheInscription.name}</p>
            </div>
         </div>
         <p className="warning">
            <AiOutlineWarning className="me-2" />
            Attention le depot de dossier se fait une seule fois!!!
         </p>
      </section>
   );
}

export default FourthStep;
