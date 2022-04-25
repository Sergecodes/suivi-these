import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {AiOutlineWarning} from "react-icons/ai"
import { addMemoire,addAttestationLicense,addDroitsUniversitaires,addReleveM1, addRapportPresoutenance } from '../../../redux/filesUploadSlice';


const FirstStep = () => {
    const files= useSelector(state=>state.filesUpload);
    const dispatch=useDispatch();
    console.log(files)
  return (
    <section className=" mt-3 step" >
      <h2>Tous vos fichiers doivent ètre scannés et enregistrés au format pdf (PDF)</h2>
       <div className="row mt-4">
        <div className="col-6 d-flex stepFile mb-3">
            <label htmlFor='Memoire' style={{}}>{files.memoire[0].name}</label>
            <input className="form-control form-control-sm mb-2" type="file" id="Memoire" onChange={e=>dispatch(addMemoire({memoire:e.target.files}))}></input>
             
          </div>
          <div className="col-6 d-flex stepFile mb-3">
            <label htmlFor='rapportPresoutenance' style={{}}>{files.rapportPresoutenance[0].name}</label>
            <input className="form-control form-control-sm mb-2" type="file" id="rapportPresoutenance" onChange={e=>dispatch(addRapportPresoutenance({rapportPresoutenance:e.target.files}))}></input>
             
          </div>
          <div className="col-6 d-flex stepFile mb-3">
            <label htmlFor='droitsUniversitaires' style={{}}>{files.droitsUniversitaires[0].name}</label>
            <input className="form-control form-control-sm mb-2" type="file" id="droitsUniversitaires" onChange={e=>dispatch(addDroitsUniversitaires({droitsUniversitaires:e.target.files}))}></input>
             
          </div>
          <div className="col-6 d-flex stepFile mb-3">
            <label htmlFor='attestationLicense' style={{}}>{files.attestationLicense[0].name}</label>
            <input className="form-control form-control-sm mb-2" type="file" id="attestationLicense" onChange={e=>dispatch(addAttestationLicense({attestationLicense:e.target.files}))}></input>
             
          </div>
       </div>
       <p className="warning d-flex align-items-center"><AiOutlineWarning className="me-2"/>Attention le depot de dossier se fait une seule fois!!!</p>
    </section>
  )
}

export default FirstStep