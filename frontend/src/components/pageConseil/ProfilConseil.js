import { useState } from "react";
import { BsPersonCircle, BsPencilFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ProfilConseil = () => {
  const navigate = useNavigate();
  const [conseilInfo, setConseilInfo] = useState({
    email: "",
    numTelephone: "",
    newPassword: "",
    confirmPassword: "",
  });
 

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setConseilInfo({ ...conseilInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(conseilInfo);
  };

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
                <BsPencilFill className="me-1" />
                Modifier votre photo
              </p>
            </div>
            <div className="col-12 col-md-6  ">
              <div className="acteurInput">
                <p>
                  {" "}
                  <BsPencilFill className="me-1" />
                  Email
                </p>
                <input
                  className="form-control "
                  type="text"
                  value={conseilInfo.email}
                  name="email"
                  onChange={handleChange}
                ></input>
              </div>
              <div className="acteurInput">
                <p>
                  {" "}
                  <BsPencilFill className="me-1" />
                  Numéro de télephone{" "}
                </p>
                <input
                  className="form-control "
                  type="text"
                  name="numTelephone"
                  value={conseilInfo.numTelephone}
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
                  value={conseilInfo.newPassword}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="acteurInput">
                <p>
                  {" "}
                  <BsPencilFill
                    className="me-1"
                    name="confirmPassword"
                    value={conseilInfo.confirmPassword}
                    onChange={handleChange}
                  />
                  Confirmer le mot de passe
                </p>
                <input className="form-control " type="password"></input>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between mx-4">
            <button
              type="button"
              className="btn acteurInfoBtnBack"
              onClick={() => {
                navigate("/acteur/conseil/dashboard");
              }}
            >
              Retour
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="btn acteurInfoBtnSubmit"
            >
              Confirmer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilConseil;
