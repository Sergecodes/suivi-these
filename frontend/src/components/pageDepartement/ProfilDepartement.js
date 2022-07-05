import React, { useState } from "react";
import { BsPersonCircle, BsPencilFill } from "react-icons/bs";
import { DepartementData } from "../../constants/Constant";
import { useNavigate } from "react-router-dom";

const ProfilDepartement = () => {
  const [departementInfo, setDepartementInfo] = useState({
    nom: DepartementData.nom + DepartementData.prenom,
    email: DepartementData.email,
    numTelephone: DepartementData.numTelephone,
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log(departementInfo)
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDepartementInfo({...departementInfo,[name]:value});
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
                  Noms et prenoms{" "}
                </p>
                <input
                  className="form-control "
                  type="text"
                  name="nom"
                  value={departementInfo.nom}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="acteurInput">
                <p>
                  {" "}
                  <BsPencilFill className="me-1" />
                  Numéro{" "}
                </p>
                <input
                  className="form-control "
                  type="text"
                  name="numTelephone"
                  value={departementInfo.numTelephone}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="acteurInputDisabled">
                <p>
                  {" "}
                  <BsPencilFill className="me-1" />
                  Modifier l'email
                </p>
                <input
                  className="form-control "
                  type="text"
                  name="email"
                  value={departementInfo.email}
                  onChange={handleChange}
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
                  value={departementInfo.newPassword}
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
                  value={departementInfo.confirmPassword}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between mx-4">
            <button type="button" className="btn acteurInfoBtnBack" onClick={() => navigate('/acteur/departement/dashboard')}>
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

export default ProfilDepartement;
