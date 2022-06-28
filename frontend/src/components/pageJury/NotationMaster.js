import { useState } from 'react';
import moment from 'moment';
import { critères } from '../../constants/Constant';
import PdfViewer from '../common/PdfViewer';
import { EtudiantData } from "../../constants/EtudiantData";

moment.locale('fr');

const NotationMaster = () => {
  const [notation, setNotation] = useState(critères);
  const [somme, setSomme] = useState(0);

  const handleChange = (e, index) => {
    const newNotation = notation;
    newNotation[index].note = e.target.value;
    setNotation(newNotation);
    setSomme(calculSomme(notation));
  }
  
  function calculSomme(notes) {
    let temp = 0;
    for (let i in notes) {
      temp = temp + parseInt(notes[i].note, 10);
    }
    return temp;
  }

  return (
    <section className="notation" >
      <p>
        Vous ètes sur le point de noter l'étudiant 
        {EtudiantData[0].nom + " " + EtudiantData[0].prenom}
      </p>
      <PdfViewer />
      <div className="my-5" style={{ width: "75%" }}>
        <div className=" notationHeader">
          <p>MATRICULE: {EtudiantData[0].matricule}</p>
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
                <input type="number" min="0" max={critère.max} defaultValue={critère.note} onChange={e => handleChange(e, index)}></input>
              </div>
            )
          })}
        </div>
      </div>
      <div className="my-3 fs-5">
        Note totale : {somme} / 60
      </div>
      <div className=" d-flex justify-content-center">
        <button className="btn submitNotation" type="button">Soumettre notation</button>
      </div>
    </section>
  )
}

export default NotationMaster;