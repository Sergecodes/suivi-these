import { useState, useEffect } from "react";
import { Select } from 'antd';
import axios from 'axios';


const { Option } = Select;


const ThirdStep = (props) => {
  console.log("component reloaded");
 // const [liste, setListe] = useState([
 //    { id: 'adf', nom: 'atangana', prenom: 'atangano' }, 
 //    { id: 'aadfv', nom: 'mbarga', prenom: 'mbarga' }, 
 //    { id: 'tdg', nom: 'loic', prenom: 'loic' },
 //    { id: 'ave', nom: 'serge', prenom: 'serge'}
 //  ]);
 const [liste, setListe] = useState([
  { id: '', nom: '', prenom: '', email: '', numTelephone: '', grade: '' },
  // { id: '', nom: '', prenom: '', email: '', numTelephone: '', grade: '' },
  // { id: '', nom: '', prenom: '', email: '', numTelephone: '', grade: '' }
 ]);
 const [choixJury, setChoixJury] = useState([
    { jury: liste[0] }, 
    { jury: liste[1] !== undefined ? liste[1] : liste[0] },
    { jury: liste[2] !== undefined ? liste[2] : liste[0] }
  ]);
 const user = JSON.parse(localStorage.getItem('user'));

 // Obtenir la liste de juries du departement
 useEffect(() => {
  axios.get(`/departements/${user.departement.id}/juries`)
    .then(res => {
      console.log(res);
      setListe(res.data);
    })
    .catch(err => {
      console.error(err);
    })
 }, []);

 const handleChange = (value, option, index) => {
  const newChoix = [...choixJury];
  newChoix[index].jury = option.jury;
  setChoixJury(newChoix);

  let newListe = [...liste];
  newListe = newListe.filter(elt => elt.id !== value);
  setListe(newListe);
 }

  return (
    <section className="mx-3 mt-3 mb-5 step">
      <h2>
        Cette partie consiste à renseigner les informations sur les enseignants
        qui vont faire partie des membres du jury
      </h2>
      <div className="my-4 d-flex justify-content-around">
        {choixJury.map((elt, index) => (
          <div key={index}>
            <label htmlFor={index} className="me-2" style={{fontSize:"16px",fontWeight:"500"}}>
              Informations jury {index + 1}: 
            </label>
            <Select
              value={elt.jury.nom + ' ' + elt.jury.prenom}
              style={{ width: 120, }}
              onChange={(value, option) => handleChange(value, option, index)}
              name={index}
            >
              {liste.map((elt, index) =>
                (
                  <Option key={elt.id} value={elt.id} jury={elt}>
                    {elt.nom + ' ' + elt.prenom}
                  </Option>
                )
              )}
            </Select>
          </div>
         )
        )}
      </div>
    </section>
  );
};

export default ThirdStep;
