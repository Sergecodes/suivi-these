import React, { useState, useEffect } from "react";
import { BsPersonCircle, BsPencilFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ProfilJury = () => {

  const user = JSON.parse(localStorage.getItem('user'));
  console.log('le type de user est',typeof(user))
  console.log("user du jury est ", user.nom);

  const [juryInfo, setJuryInfo] = useState({
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    numTelephone: user.numTelephone,
    newPassword: "",
    olPassword: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    toast.info(
      "Vous devriez vous reconnecter si vous changez votre email ou mot de passe",
      { hideProgressBar: true }
    );
  }, []);


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setJuryInfo({ ...juryInfo, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let requests = {};

    if (user.email !== juryInfo.email) {
      requests['emailRequest'] = axios.put('/jury/change-email', { newEmail: juryInfo.email });
    }

    if (user.numTelephone !== juryInfo.numTelephone) {
      requests['telRequest'] = axios.put('/jury/update-profile', { numTelephone: juryInfo.numTelephone });
    }

    if (juryInfo.newPassword.trim() !== '') {
      if (juryInfo.oldPassword.trim() === '') {
        toast.error("Entrez votre ancien mot de passe", { hideProgressBar: true });
        return false;
      } else {
        requests['passwordRequest'] = axios.put('/jury/change-password', {
          pass: juryInfo.oldPassword, newPass: juryInfo.newPassword
        });
      }
    }
    console.log(requests);

    // we can start sending requests, so stop modification
    let numReqs = Object.keys(requests).length;

    if (numReqs > 0) {
      Promise.all(Object.values(requests))
        .then(results => {
          const [res1, res2, res3] = results;
          console.log(results)
          console.log(res1);
          console.log(res2);
          console.log(res3);
          const data1 = res1.data, data2 = res2 && res2.data, data3 = res3 && res3.data;

          if (requests.telRequest) {
            // No need to test for undefined, the first of these data to have numTelephone
            // will prevent the next from executing
            user.numTelephone = data1.numTelephone || data2.numTelephone || data3.numTelephone;
          }

          // No need to set email in localStorage since user will be redirected
          // to logout page and after relogging in, his email will be set
          // if (requests.emailRequest) {
          //   user.email = data1.newEmail || data2.newEmail || data3.newEmail;
          // }

          localStorage.setItem('user', JSON.stringify(user));

          if (requests.passwordRequest || requests.emailRequest) {
            localStorage.removeItem('user');
            localStorage.removeItem('actor');

            toast.success(
              "Mise a jour effectuee avec succes! Vous serez renvoyez a la page de connexion...",
              { hideProgressBar: true }
            );

            // Dismiss all toasts after 3 seconds then navigate to login page
            setTimeout(() => {
              toast.dismiss();
              navigate('/connexion');
            }, 3000);

          } else {
            toast.success("Mise a jour effectuee avec succes!", { hideProgressBar: true });
          }
        })
        .catch(err => {
          console.error(err);

          if ('passwordRequest' in requests && err.response.status === 401) {
            toast.error("Votre ancien mot de passe est incorrect", { hideProgressBar: true });
          } else {
            toast.error("Une erreur est survenue", { hideProgressBar: true });
          }
        });
    } else {
      toast.info("Aucune modification faite", { hideProgressBar: true });
    }

    // For some reason, toasts are displayed after clicking the modification button
    // for a second time. Do this to force-remove all toasts
    setTimeout(() => {
      console.log("in set time out....");
      toast.dismiss();
    }, 4000);
  }


  return (
    <section className="my-5">
      <ToastContainer />
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
                  className="form-control acteurInputDisabled"
                  type="text"
                  name="nom"
                  defaultValue={juryInfo.nom}
                  disabled={true}
                ></input>
              </div>
              <div className="acteurInput">
                <p>
                  {" "}
                  <BsPencilFill className="me-1" />
                  Prenom{" "}
                </p>
                <input
                  className="form-control acteurInputDisabled"
                  type="text"
                  name="prenom"
                  defaultValue={juryInfo.prenom}
                  onChange={handleChange}
                  disabled={true}
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
                  value={juryInfo.numTelephone}
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
                  value={juryInfo.email}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="acteurInput">
                <p>
                  {" "}
                  <BsPencilFill className="me-1" />
                  Ancien mot de passe
                </p>
                <input
                  className="form-control "
                  type="password"
                  name="olPassword"
                  value={juryInfo.olPassword}
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
                  value={juryInfo.newPassword}
                  onChange={handleChange}
                ></input>
              </div>
              
            </div>
          </div>
          <div className="d-flex justify-content-between mx-4">
            <button type="button" className="btn acteurInfoBtnBack" onClick={() => navigate('/acteur/jury/dashboard')}>
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

export default ProfilJury;
