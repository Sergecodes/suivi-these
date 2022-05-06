import React, { useState } from "react";
/*import {
  addFirstEnseignant,
  addSecondEnseignant,
  addThirdEnseignant,
} from "../../../redux/MasterFilesUploadSlice";
import { useSelector, useDispatch } from "react-redux";*/

const ThirdStep = (props) => {
  //const dispatch = useDispatch();

 // const files = useSelector((state) => state.masterFilesUpload);
  const [enseignant, setEnseignant] = useState({
    nom: "nom enseignant",
    prenom: "prenom enseignant",
    email: "email",
    telephone: "telephone",
    grade: "grade",
  });
  const [enseignant2, setEnseignant2] = useState({
    nom: "nom enseignant2",
    prenom: "prenom enseignant2",
    email: "email2",
    telephone: "telephone2",
    grade: "grade2",
  });
  const [enseignant3, setEnseignant3] = useState({
    nom: "nom enseignant3",
    prenom: "prenom enseignant3",
    email: "email3",
    telephone: "telephone3",
    grade: "grade3",
  });

  const getEnseignant = () => {
    if (props.numero === 1) {
      return enseignant;
    } else if (props.numero === 2) {
      return enseignant2;
    } else if (props.numero === 3) {
      return enseignant3;
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (props.numero === 1) setEnseignant({ ...enseignant, [name]: value });
    else if (props.numero === 2)
      setEnseignant2({ ...enseignant, [name]: value });
    else if (props.numero === 3)
      setEnseignant3({ ...enseignant, [name]: value });
  };


  return (
    <section className="mx-3 mt-3 mb-5 step">
      <h2>
        Cette partie consiste à renseigner les informations sur les enseignants
        qui vont faire partie des membres du jury
      </h2>

      <div className="">
        <p className="fw-bold">Informations sur l'enseignant {props.numero}</p>
        <form>
          <div className="profileBlockInfo row">
            <div className="col-12 col-sm-6">
              <div className=" ">
                <p> Nom</p>
                <input
                  className="form-control"
                  type="text"
                  value={getEnseignant().nom}
                  name="nom"
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className="col-12 col-sm-6 ">
              <div className=" ">
                <p> Prenom</p>
                <input
                  className="form-control "
                  type="text"
                  value={getEnseignant().prenom}
                  name="prenom"
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </div>
          <div className="profileBlockInfo row">
            <div className="col-12 col-sm-6">
              <div className=" ">
                <p> Email</p>
                <input
                  className="form-control "
                  type="text"
                  value={getEnseignant().email}
                  name="email"
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className=" ">
                <p> Telephone</p>
                <input
                  className="form-control "
                  type="text"
                  value={getEnseignant().telephone}
                  name="telephone"
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </div>
          <div className="profileBlockInfo row">
            <div className="col-12 col-sm-6">
              <div className=" ">
                <p> Grade</p>
                <input
                  className="form-control "
                  type="text"
                  value={getEnseignant().grade}
                  name="grade"
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ThirdStep;
