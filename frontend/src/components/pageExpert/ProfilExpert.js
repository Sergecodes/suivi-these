import React, { useState } from "react";
import { BsPersonCircle, BsPencilFill } from "react-icons/bs";
import { ExpertData } from "../../constants/Constant";
import { useNavigate } from "react-router-dom";

const ProfilExpert = () => {
  const [expertInfo, setExpertInfo] = useState({
    nom: ExpertData.nom ,
    prenom: ExpertData.prenom,
    email: ExpertData.email,
    ville:ExpertData.ville,
    numTelephone: ExpertData.numTelephone,
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log(expertInfo)
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setExpertInfo({...expertInfo,[name]:value});
  }

  return (
    <section className="my-5">
      <div
        className="row d-flex justify-content-center"
        style={{ width: "100%" }}
      >
        <div className="col-12 col-sm-8  modifInfo pt-3 pb-5">
          <p
            className="text-center fs-5 fw-light py-2"
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
                <BsPencilFill />
                Modifier votre photo
              </p>
            </div>
            <div className="col-12 col-md-6 py-2 ">
              <div className="acteurInput">
                <p>
                  {" "}
                  <BsPencilFill className="me-1" />
                  Nom{" "}
                </p>
                <input
                  className="form-control "
                  type="text"
                  name="nom"
                  value={expertInfo.nom}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="acteurInput">
                <p>
                  {" "}
                  <BsPencilFill className="me-1" />
                  Prenom{" "}
                </p>
                <input
                  className="form-control "
                  type="text"
                  name="prenom"
                  value={expertInfo.prenom}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="acteurInput">
                <p>
                  {" "}
                  <BsPencilFill className="me-1" />
                  Numéro de telephone{" "}
                </p>
                <input
                  className="form-control "
                  type="text"
                  name="numTelephone"
                  value={expertInfo.numTelephone}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="acteurInput">
                <p>
                  {" "}
                  <BsPencilFill className="me-1" />
                  Email
                </p>
                <input
                  className="form-control "
                  type="text"
                  name="email"
                  value={expertInfo.email}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="acteurInput">
                <p>
                  {" "}
                  <BsPencilFill className="me-1" />
                  Ville
                </p>
                <input
                  className="form-control "
                  type="text"
                  name="ville"
                  value={expertInfo.ville}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="acteurInput">
                <p>
                  {" "}
                  <BsPencilFill className="me-1" />
                  Nouveau mot de passe
                </p>
                <input
                  className="form-control "
                  type="password"
                  name="newPassword"
                  value={expertInfo.newPassword}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="acteurInput">
                <p>
                  {" "}
                  <BsPencilFill className="me-1" />
                  Confirmer le mot de passe
                </p>
                <input
                  className="form-control "
                  type="password"
                  name="confirmPassword"
                  value={expertInfo.confirmPassword}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between mx-4">
            <button type="button" className="btn acteurInfoBtnBack" onClick={() => navigate('/acteur/expert/dashboard')}>
              Retour
            </button>
            <button type="button" className="btn acteurInfoBtnSubmit" onClick={handleSubmit}>
              Confirmer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilExpert;
