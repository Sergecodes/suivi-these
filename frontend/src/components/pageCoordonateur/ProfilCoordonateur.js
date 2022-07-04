import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { BsPencilFill } from "react-icons/bs";


const ProfilCoordonateur = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [tel, setTel] = useState(user.numTelephone);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    toast.info(
      "Vous devriez vous reconnecter si vous changez votre email ou mot de passe",
      { hideProgressBar: true }
    );
  }, []);

  const handleSubmit = (e) => {
    alert(tel)
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
            className="text-center fs-5 fw-light "
            style={{ color: "rgb(87, 84, 84)" }}
          >
            Modifier les informations
          </p>
          <div className="row" style={{ width: "100%", margin: "0" }}>
            <div className="col-12 col-md-6">
              <div className="acteurInputDisabled">
                <p> Email</p>
                <input
                  className="form-control "
                  type="text"
                  disabled={true}
                  defaultValue={user.email}

                />
              </div>
              <div className="acteurInputDisabled">
                <p> Nom</p>
                <input
                  className="form-control "
                  type="text"
                  disabled={true}
                  defaultValue={user.nom}
                />
              </div>
              <div className="acteurInputDisabled">
                <p> Prenom</p>
                <input
                  className="form-control "
                  type="text"
                  disabled={true}
                  defaultValue={user.prenom}
                />
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
                />
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
                  name="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="acteurInput">
                <p>
                  {" "}
                  <BsPencilFill
                    className="me-1"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  Confirmer le mot de passe
                </p>
                <input className="form-control " type="password" />
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

export default ProfilCoordonateur