import React, { useState, useEffect } from "react";
import {Select} from 'antd';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {  addJury} from "../../../redux/MasterFilesUploadSlice";

const { Option } = Select;


const ThirdStep = (props) => {
   const [allJuries, setAllJuries] = useState([
      { id: 'aaa',email:'aaa@gmail.com', nom: 'aaa', prenom: 'aaa' }, 
      { id: 'bbb',email:'bbb@gmail.com', nom: 'bbb', prenom: 'bbb' }, 
      { id: 'ccc',email:'ccc@gmail.com', nom: 'ccc', prenom: 'ccc' },
      { id: 'ddd',email:'ddd@gmail.com', nom: 'ddd', prenom: 'ddd'},
      { id: 'eee',email:'eee@gmail.com', nom: 'eee', prenom: 'eee' },
      { id: 'fff',email:'fff@gmail.com', nom: 'fff', prenom: 'fff'}
   ]);
   const numListes = 3, numJuries = allJuries.length;
   const files= useSelector(state=>state.masterFilesUpload);
   const dispatch = useDispatch()
   const user = JSON.parse(localStorage.getItem('user'));
   const [selectableJuries, setSelectableJuries] = useState(allJuries.slice(-(numJuries - numListes)));
   const [selectedJuries, setSelectedJuries] = useState((function () {
    let output = [];
    for (let i = 0; i < numListes; i++) {
      output.push(allJuries[i]);
    }

    return output;
  })());

   // Number of juries should be >= number of listes.
   if (numListes > numJuries) {
      throw Error("Le nombre de juries doit etre superieure ou egal au nombre de listes");
   }

   // Obtenir la liste de juries du departement
  //  useEffect(() => {
  //   axios.get(`/departements/${user.departement.id}/juries`)
  //     .then(res => {
  //       console.log(res);
  //       setAllJuries(res.data);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     })
  //  }, []);

  //getting the initial value of the select
  useEffect(()=>{
    dispatch(addJury({jury:selectedJuries}))
  },[])


   const handleChange = (value, option, listIdx) => {
      // console.log(value);  // value of selected option
      // console.log(option); // option element of modified list
      // console.log(listIdx);  // index of modified liste
      
      // curJury is the newly selected jury in the list and 
      // prevJury is the previously selected
      const curJury = option.jury, prevJury = selectedJuries[listIdx];

      // Set chosen option in selectedJuries
      let newSelectedJuries = selectedJuries.slice();
      newSelectedJuries[listIdx] = curJury;
      setSelectedJuries(newSelectedJuries);
      dispatch(addJury({jury:newSelectedJuries}));

      // Replace curJury with prevJury in selectableJuries to mark that prevJury is now selectable
      let idxCurJury = selectableJuries.findIndex(jury => jury.id === curJury.id);
      console.assert(idxCurJury !== -1, "idxCurJury is -1 (curJury is not in selectableJuries)");

      let newSelectableJuries = selectableJuries.slice();
      newSelectableJuries[idxCurJury] = prevJury;
      setSelectableJuries(newSelectableJuries);
   
   } 

  return (
    <section className="mx-3 mt-3 mb-5 step">
      <h2>
        Cette partie consiste à renseigner les informations sur les enseignants
        que vous voulez qu'ils fassent partie des membres du jury
      </h2>
      <div className="my-4 d-flex justify-content-around">
        {selectedJuries.map((jury, listIdx) => {
            return (
               <div key={listIdx}>
                 <label htmlFor={listIdx} className="me-2" style={{ fontSize:"16px", fontWeight:"500" }}>
                   Informations jury {listIdx + 1}: 
                 </label>
                 <Select
                   style={{ width: 120, }}
                   defaultValue={jury.nom + ' ' + jury.prenom}
                   onChange={(value, option) => handleChange(value, option, listIdx)}
                   name={listIdx}
                 >
                   {selectableJuries.map(elt => 
                    (
                      <Option key={elt.id} value={elt.id} jury={elt}>
                        {elt.nom + ' ' + elt.prenom}
                     </Option>
                    )
                  )}
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