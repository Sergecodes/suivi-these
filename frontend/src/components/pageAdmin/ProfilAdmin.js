import { useState, useEffect } from "react";
//import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import { BsPersonCircle, BsPencilFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ProfilAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [adminInfo, setAdminInfo] = useState({
    email: "",
    numTelephone: "",
    newPassword: "",
    confirmPassword: "",
  });
  useEffect(() => {
    toast.info(
      "Vous devriez vous reconnecter si vous changez votre email ou mot de passe",
      { hideProgressBar: true }
    );
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAdminInfo({ ...adminInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(adminInfo);
  };

  return (
    <section className="my-5">
      <ToastContainer />
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
                  value={adminInfo.email}
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
                  value={adminInfo.numTelephone}
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
                  value={adminInfo.newPassword}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="acteurInput">
                <p>
                  {" "}
                  <BsPencilFill
                    className="me-1"
                    name="confirmPassword"
                    value={adminInfo.confirmPassword}
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
                navigate("/acteur/admin/dashboard");
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

export default ProfilAdmin;
