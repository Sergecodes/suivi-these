import React, { useState } from "react";
import {Select} from 'antd'
/*import {
  addFirstEnseignant,
  addSecondEnseignant,
  addThirdEnseignant,
} from "../../../redux/MasterFilesUploadSlice";
import { useSelector, useDispatch } from "react-redux";*/

const ThirdStep = (props) => {
  //const dispatch = useDispatch();

 // const files = useSelector((state) => state.masterFilesUpload);
 const {Option}=Select;
 const [liste,setListe]=useState(['atangana',"mbarga","serge","loic"])
 const [choixJury, setChoixJury]= useState([{jury:liste[0]}, {jury:liste[1]!==undefined?liste[1]:liste[0]},{jury:liste[2]!==undefined?liste[2]:liste[0]}]);

 const handleChange=(value, index)=>{

  const newChoix= [...choixJury];
  newChoix[index].jury=value;
  setChoixJury(newChoix);
  let newListe=[...liste];
  newListe=newListe.filter(elt=>elt!==value);
  setListe(newListe)

 }


 
  return (
    <section className="mx-3 mt-3 mb-5 step">
      <h2>
        Cette partie consiste à renseigner les informations sur les enseignants
        qui vont faire partie des membres du jury
      </h2>
      <div className="my-4 d-flex justify-content-around">
        {
          choixJury.map((elt,index)=>{
           return(
            <div key={index}>
              <label htmlFor={index} className="me-2 " style={{fontSize:"16px",fontWeight:"500"}}>Informations jury {index +1}: </label>
              <Select
                value={elt.jury}
                style={{
                  width: 120,
                }}
                onChange={(e)=>handleChange(e,index)}
                name={index}
              >
                {
                  liste.map((elt,index)=>{
                    return(
                      <Option key={index} value={elt}>{elt}</Option>
                    )
                  })
                }
              </Select>
            </div>
           )
          })
        }
      </div>
    </section>
  );
};

export default ThirdStep;
