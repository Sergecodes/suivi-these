import { useState, useEffect } from "react";
import { Select } from 'antd';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from "react-redux";
import { addJury } from "../../../redux/MasterFilesUploadSlice";

const { Option } = Select;


const ThirdStep = () => {
   const user = JSON.parse(localStorage.getItem('user'));
   const dispatch = useDispatch();
   const numListes = 3;

   const [selectableJuries, setSelectableJuries] = useState([]);
   const [selectedJuries, setSelectedJuries] = useState([]);

   const getSelectedJuries = (listeJuries) => {
    let output = [];
    for (let i = 0; i < numListes; i++) {
      output.push(listeJuries[i]);
    }

    return output;
   }

   const getSelectableJuries = (listeJuries) => {
      let numJuries = listeJuries.length;
      let sliceCount = numJuries - numListes;

       // If sliceCount is 0, that implies the number of juries is the same as the 
       // number of listes, so use an empty array for selectableJuries
       return sliceCount > 0 ? listeJuries.slice(-sliceCount) : []
   }

   // Obtenir la liste de juries du departement
   useEffect(() => {
    let allJuries = JSON.parse(localStorage.getItem('juries'));

    if (allJuries === null) {
      axios.get(`/departements/${user.departement.id}/juries`)
        .then(res => {
          console.log(res);
          allJuries = parseResult(res.data);

          // Number of juries should be >= number of listes.
           if (numListes > allJuries) {
              throw Error("Le nombre de juries doit etre superieure ou egal au nombre de listes");
           } else {
            localStorage.setItem('juries', JSON.stringify(allJuries));
            setSelectedJuries(getSelectedJuries(allJuries));
            setSelectableJuries(getSelectableJuries(allJuries)); 
           }
        })
        .catch(err => {
          toast.error("Une erreur est survenue!", { hideProgressBar: true });
          console.error(err);
        });
    } else {
      setSelectedJuries(getSelectedJuries(allJuries));
      setSelectableJuries(getSelectableJuries(allJuries)); 
    } 
   }, []);

  // getting the initial value of the select
  useEffect(() => {
    dispatch(addJury({ jury: selectedJuries }));
  }, [dispatch, selectedJuries]);


  const parseResult = (resData) => {
    let result = [];
    for (let jury of resData) {
      result.push({
        id: jury.id,
        email: jury.email,
        nom: jury.nom,
        prenom: jury.prenom
      });
    }

    return result;
  }


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

      // Replace curJury with prevJury in selectableJuries to mark that prevJury is now selectable
      let idxCurJury = selectableJuries.findIndex(jury => jury.id === curJury.id);
      console.assert(idxCurJury !== -1, "idxCurJury is -1 (curJury is not in selectableJuries)");

      let newSelectableJuries = selectableJuries.slice();
      newSelectableJuries[idxCurJury] = prevJury;
      setSelectableJuries(newSelectableJuries);
   } 

  return (
    <section className="mx-3 mt-3 mb-5 step">
      <ToastContainer />
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