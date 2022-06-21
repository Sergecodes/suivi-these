import React,{useState} from 'react';
import { EtudiantData } from '../../constants/EtudiantData';
import {BsArrowRepeat} from "react-icons/bs";
import {GiCancel} from "react-icons/gi";
import {BsPencil} from "react-icons/bs";
import ImageUpload from "./upload/ImageUpload"

const StudentProfile = () => {
  const [tel,setTel]=useState(EtudiantData[0].numTelephone);
  const [newPassword, setNewPassword]=useState("");
  const [confirmPassword, setConfirmPassword]= useState("");
  const [modification,setModification]=useState(false);
  const etudiant = JSON.parse(localStorage.getItem('user'));

  return (
    <section className="mx-3 mt-3 mb-5">
        <div className="ModifiedProfileImg  align-items-center " style={modification===false?{display:"flex"}:{display:"none"}}>
            <img src={etudiant.urlPhotoProfil } alt="#" className=""></img>
            <p className="fs-6 fw-lighter ms-2">
                Cliquez sur modifier pour pouvoir modifier votre photo de profil
            </p>
        </div>
        <div className="align-items-center" style={modification===true?{display:"flex"}:{display:"none"}}>
            <ImageUpload/>
            <p className="fs-6 fw-lighter ms-2">
              Cliquer pour uploader une image de votre choix sous format PNG,JPG,JPEG,PNG
            </p>
        </div>
        <div className="my-2">
          <form>
            <div className="profileBlockInfo row">
              <div className="col-12 col-sm-6">
                <div className=" ">
                  <p> Matricule</p>
                  <input className="form-control " type="text" disabled={true} defaultValue={EtudiantData[0].matricule} ></input>
                </div>
              </div>
              <div className="col-12 col-sm-6 ">
                <div className="">
                  <p>Adresse mail</p>
                  <input className="form-control " type="text" disabled={true} defaultValue={EtudiantData[0].email } ></input>
                </div>
              </div>    
            </div>
            <div className="profileBlockInfo row">
             <div className="col-12 col-sm-6">
                <div>
                  <p>Nom</p>
                  <input className="form-control " type="text" disabled={true} defaultValue={EtudiantData[0].nom} ></input>
                </div>
             </div>
              <div className='col-12 col-sm-6'>
                <div>
                  <p>Prenom</p>
                  <input className="form-control " type="text" disabled={true} defaultValue={EtudiantData[0].prenom } ></input>
                </div>
              </div>
            </div>
            <div className="profileBlockInfo row">
              <div className="col-12 col-sm-6">
                <div>
                  <p> Date de naissance</p>
                  <input className="form-control " type="date" defaultValue={EtudiantData[0].dateNaissance} disabled={true}></input>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div>
                  <p> Lieu de naissance</p>
                  <input className="form-control " type="text" defaultValue={EtudiantData[0].lieuNaissance} disabled={true} ></input>
                </div>
              </div>
            </div>
            <div className="profileBlockInfo row">
              <div className="col-12 col-sm-6">
                <div>
                  <p>Sexe</p>
                  <div className="">
                  <input className="form-check-input" type="radio"   checked={EtudiantData[0].sexe==="M"?true:false}   disabled={true}/><span>Homme</span>
                  <input className="form-check-input ms-3" type="radio"   checked={EtudiantData[0].sexe==="F"?true:false}  disabled={true}/><span>Femme</span>
                  </div>
                </div>
              </div>
              <div className='col-12 col-sm-6'>
                <div>
                  <p>Numéro de téléphone</p>
                  <input className="form-control txt" type="text " name="tel" value={tel} disabled={modification?false:true} onChange={(e)=>setTel(e.target.value)}></input>
                </div>
              </div>
            </div>
            <div className="profileBlockInfo row">
              <div className='col-12 col-sm-6'>
                <div>
                  <p> Nouveau Mot de passe</p>
                  <input className="form-control " type="password" name="newPassword" value={newPassword} disabled={modification?false:true}  onChange={(e)=>setNewPassword(e.target.value)}  ></input>
                </div>
              </div>
              <div className='col-12 col-sm-6'>
                <div>
                  <p> Confirmation du mot de passe</p>
                  <input className="form-control " type="password" name="confirmPassword" value={confirmPassword} disabled={modification?false:true} onChange={(e)=>setConfirmPassword(e.target.value)}></input>
                </div>
              </div>
            </div>
            <div className="profileModifButton  mt-4">
              <button className="btn btn-secondary " type='button' style={modification===true?{display:'none'}:{}}  onClick={()=>setModification(true)}><BsPencil/>  Modifier informations</button>
                <button className="btn btn-primary updatePassword me-3 " type="submit" style={modification===false?{display:'none'}:{}} > <BsArrowRepeat/>  Mettre à jour</button>
                <button className="btn btn-danger ms-3" type='button' onClick={()=>setModification(false)} style={modification===false?{display:'none'}:{}} ><GiCancel/>  Annuler</button>
            </div>
          </form>
        </div>
    </section>
  )
}

export default StudentProfile