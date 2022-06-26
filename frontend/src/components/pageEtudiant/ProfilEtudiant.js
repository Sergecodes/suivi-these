import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsArrowRepeat } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";
import { BsPencil } from "react-icons/bs";
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import ImageUpload from "./upload/ImageUpload";


const StudentProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [tel, setTel] = useState(user.numTelephone);
  const [email, setEmail] = useState(user.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [modification, setModification] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let requests = {};

    if (user.email !== email) {
      requests['emailRequest'] = axios.put('/etudiants/change-email', { newEmail: email });
    } 

    if (user.numTelephone !== tel) {
      requests['telRequest'] = axios.put('/etudiants/change-phone-number', { newPhoneNumber: tel });
    }

    if (newPassword !== '') {
      if (oldPassword === '') {
        toast.error("Entrez votre ancien mot de passe", { hideProgressBar: true });
        return false;
      } else {
        requests['passwordRequest'] = axios.put('/etudiants/change-password', { 
          pass: oldPassword, newPass: newPassword 
        });
      }
    }

    // we can start sending requests, so stop modification
    setModification(false);
    let numReqs = Object.keys(requests).length;

    if (numReqs === 0) {
      Promise.all(Object.values)
        .then(results => {
          const [res1, res2, res3] = results;
          console.log(res1);
          console.log(res2);
          console.log(res3);
          const data1 = res1.data, data2 = res2.data, data3 = res3.data;
          
          if (requests.telRequest) {
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
            navigate('/connexion');
          }
        })
        .catch(err => {
          console.error(err);
          toast.error("Une erreur est survenue", { hideProgressBar: true });
        });
    } else {
      toast.info("Aucune modification faite", { hideProgressBar: true });
    }
  }

  return (
    <>
      <ToastContainer />
      <section className="mx-3 mt-3 mb-5">
        <div className="ModifiedProfileImg align-items-center " style={modification === false ? { display: "flex" } : { display: "none" }}>
          <img src={user.urlPhotoProfil} alt="profil" className=""></img>
          <p className="fs-6 fw-lighter ms-2">
            Cliquez sur modifier pour pouvoir modifier votre photo de profil
          </p>
        </div>
        <div className="align-items-center" style={modification === true ? { display: "flex" } : { display: "none" }}>
          <ImageUpload />
          <p className="fs-6 fw-lighter ms-2">
            Cliquer pour uploader une image de votre choix sous format PNG, JPG, JPEG
          </p>
        </div>
        <div className="my-2">
          <form>
            <div className="profileBlockInfo row">
              <div className="col-12 col-sm-6">
                <div className=" ">
                  <p> Matricule</p>
                  <input className="form-control" type="text" disabled={true} defaultValue={user.matricule}  />
                </div>
              </div>
              <div className="col-12 col-sm-6 ">
                <div className="">
                  <p>Adresse mail</p>
                  {/* <input className="form-control" type="text" disabled={true} defaultValue={user.email}  /> */}
                  <input className="form-control" type="email " name="email" value={email} disabled={modification ? false : true} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="profileBlockInfo row">
              <div className="col-12 col-sm-6">
                <div>
                  <p>Nom</p>
                  <input className="form-control" type="text" disabled={true} defaultValue={user.nom}  />
                </div>
              </div>
              <div className='col-12 col-sm-6'>
                <div>
                  <p>Prenom</p>
                  <input className="form-control" type="text" disabled={true} defaultValue={user.prenom}  />
                </div>
              </div>
            </div>
            <div className="profileBlockInfo row">
              <div className="col-12 col-sm-6">
                <div>
                  <p> Date de naissance</p>
                  <input className="form-control" type="date" defaultValue={user.dateNaissance} disabled={true} />
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div>
                  <p> Lieu de naissance</p>
                  <input className="form-control" type="text" defaultValue={user.lieuNaissance} disabled={true}  />
                </div>
              </div>
            </div>
            <div className="profileBlockInfo row">
              <div className="col-12 col-sm-6">
                <div>
                  <p>Sexe</p>
                  <div className="">
                    <input className="form-check-input" type="radio" checked={user.sexe === "Mâle" ? true : false} disabled={true} /><span>Homme</span>
                    <input className="form-check-input ms-3" type="radio" checked={user.sexe === "Femelle" ? true : false} disabled={true} /><span>Femme</span>
                  </div>
                </div>
              </div>
              <div className='col-12 col-sm-6'>
                <div>
                  <p>Numéro de téléphone</p>
                  <input className="form-control txt" type="text " name="tel" value={tel} disabled={modification ? false : true} onChange={(e) => setTel(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="profileBlockInfo row">
              <div className='col-12 col-sm-6'>
                <div>
                  <p> Ancien Mot de passe</p>
                  <input className="form-control" type="password" name="oldPassword" value={oldPassword} disabled={modification ? false : true} onChange={(e) => setOldPassword(e.target.value)} />
                </div>
              </div>
              <div className='col-12 col-sm-6'>
                <div>
                  <p> Nouveau mot de passe</p>
                  <input className="form-control" type="password" name="newPassword" value={newPassword} disabled={modification ? false : true} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="profileModifButton  mt-4">
              <button className="btn btn-secondary " type='button' style={modification === true ? { display: 'none' } : {}} onClick={() => setModification(true)}><BsPencil />  Modifier informations</button>
              <button className="btn btn-primary updatePassword me-3" onClick={e => handleSubmit(e)} type="submit" style={modification === false ? { display: 'none' } : {}} > <BsArrowRepeat />  Mettre à jour</button>
              <button className="btn btn-danger ms-3" type='button' onClick={() => setModification(false)} style={modification === false ? { display: 'none' } : {}} ><GiCancel />  Annuler</button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default StudentProfile;
