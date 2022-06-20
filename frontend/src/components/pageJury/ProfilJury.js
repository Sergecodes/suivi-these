import React,{useState} from 'react';
import { JuryData } from '../../constants/Constant';
import { BsPersonCircle, BsPencilFill } from "react-icons/bs";
import axios from 'axios';


const ProfilJury = () => {
  const [tel, setTel] = useState(JuryData.numTelephone);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log('entrer')
    var formData = new FormData();
    formData.append("newPhoneNumber",tel);
    axios.put('/jury/change-number',formData,{widthCredentials:true})
    .then(res=>{
      console.log(res);
    })
    .catch(err=>{
      console.error(err);
    })
  }
  return (
    <section className="my-5">
      <div
        className="row d-flex justify-content-center"
        style={{ width: "100%" }}
      >
        <div className="col-12 col-sm-8  modifInfo pt-3 pb-5">
          <p
            className="text-center fs-5 fw-light "
            style={{ color: "rgb(87, 84, 84)" }}
          >
            Modifier les informations
          </p>
          <div className="row" style={{ width: "100%", margin: "0" }}>
            <div className="col-12 col-md-6 py-2 d-flex flex-column align-items-center justify-content-center modifPhotoActeur">
              <BsPersonCircle
                className="border rounded-circle"
                style={{ height: "90px", width: "90px", color: "darkgray" }}
              />
              <p className="my-2">
                <BsPencilFill className="me-1"/>
                Modifier votre photo
              </p>
            </div>
            <div className="col-12 col-md-6  ">
              <div className="acteurInputDisabled">
                <p> matricule</p>
                <input
                  className="form-control "
                  type="text"
                  disabled={true}
                  defaultValue={JuryData.matricule}
                ></input>
              </div>
              <div className="acteurInputDisabled"  >
                <p> Email</p>
                <input
                  className="form-control "
                  type="text"
                  disabled={true}
                  defaultValue={JuryData.email}
                 
                ></input>
              </div>
              <div className="acteurInputDisabled">
                <p> Nom</p>
                <input
                  className="form-control "
                  type="text"
                  disabled={true}
                  defaultValue={JuryData.nom}
                ></input>
              </div>
              <div className="acteurInputDisabled">
                <p> Prenom</p>
                <input
                  className="form-control "
                  type="text"
                  disabled={true}
                  defaultValue={JuryData.prenom}
                ></input>
              </div>
              <div className="acteurInput">
                <p>
                  {" "}
                  <BsPencilFill className="me-1" />
                  Modifier le numéro{" "}
                </p>
                <input
                  className="form-control "
                  type="text"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                ></input>
              </div>
              <div className="acteurInput">
                <p>
                  {" "}
                  <BsPencilFill className="me-1" />
                  Modifier le mot de passe
                </p>
                <input
                  className="form-control "
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                ></input>
              </div>
              <div className="acteurInput">
                <p>
                  {" "}
                  <BsPencilFill
                    className="me-1"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  Confirmer le mot de passe
                </p>
                <input className="form-control " type="password"></input>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between mx-4">
            <button type="button" className="btn acteurInfoBtnBack">
              Retour
            </button>
            <button type="button" onClick={handleSubmit} className="btn acteurInfoBtnSubmit">
              Confirmer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilJury