import React,{useState} from 'react';
import { critères } from '../../constants/Constant';
import PdfViewer from '../common/PdfViewer';
import {EtudiantData} from "../../constants/EtudiantData";

const NotationMaster = () => {
  const date= new Date();
  
  const [notation,setNotation]=useState(critères);
  const handleChange=(e,index)=>{
        const newNotation=notation;
        newNotation[index].note=e.target.value;
        setNotation(newNotation);
        console.log(notation);
  }
  return (
    <section className="notation" >
      <p>Vous ètes sur le point de noter l'étudiant {EtudiantData[0].nom + " " +EtudiantData[0].prenom}</p>
    	<PdfViewer/>
      <div className="my-5" style={{width:"75%"}}>
        <div className=" notationHeader">
          <p>MATRICULE: {EtudiantData[0].matricule}</p>
          <p>NOTE DE LECTURE/60</p>
          <p>DATE:{date.getDay()+"-"+date.getMonth()+"-"+date.getFullYear()}</p>
        </div>
        <hr/>
        <div className="notationHeader">
          <p>Quelle mention accorderez vous par rapport à <br/> Score the viva voce on the following basis</p>
          <p>Note/mark</p>
        </div>
        <div>
          {notation.map((critère,index)=>{
            return(
              <div key={critère.id} className="notationHeaderElements">
                  <p>{critère.nom}</p>
                  <input type="number" defaultValue={critère.note} onChange={e=>handleChange(e,index)}></input>
              </div>
            )
          })}
        </div>
      </div>
      <div className=" d-flex justify-content-center">
        <button className="btn submitNotation" type="button">Soumettre notation</button>
      </div>
    </section>
  )
}

export default NotationMaster;