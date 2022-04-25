import React,{useState} from 'react';
import { EtudiantData } from '../../constants/EtudiantData';
import {BsArrowRepeat} from "react-icons/bs";
import {GiCancel} from "react-icons/gi";
import {BsPencil} from "react-icons/bs"

const StudentProfile = () => {
  const [tel,setTel]=useState(EtudiantData[0].numTelephone);
  const [newPassword, setNewPassword]=useState("");
  const [confirmPassword, setConfirmPassword]= useState("");
  const [modification,setModification]=useState(false)

  return (
    <section className="py-4">
        <div className="ModifiedProfileImg d-flex align-items-end " >
            <img src={EtudiantData[0].urlPhotoProfil } alt="#" className=""></img>
            <div className="ms-4">
                <input className="form-control form-control-sm mb-1" type="file" id="formFileSm" style={{width:"280px"}}></input>
                <label htmlFor="formFileSm" className="form-label " style={{fontSize:"14px"}}>Chargez une image en JPG ,GIF ou PNG 300*300 requis</label>
            </div>
        </div>
        <div>
          <form>
            <div className="profileBlockInfo row">
              <div className="col-6">
                <div className=" ">
                  <p> Matricule</p>
                  <input className="form-control " type="text" disabled={true} defaultValue={EtudiantData[0].matricule} ></input>
                </div>
              </div>
              <div className="col-6 ">
                <div className="">
                  <p>Adresse mail</p>
                  <input className="form-control " type="text" disabled={true} defaultValue={EtudiantData[0].email } ></input>
                </div>
              </div>    
            </div>
            <div className="profileBlockInfo row">
             <div className="col-6">
                <div>
                  <p>Nom</p>
                  <input className="form-control " type="text" disabled={true} defaultValue={EtudiantData[0].nom} ></input>
                </div>
             </div>
              <div className='col-6'>
                <div>
                  <p>Prenom</p>
                  <input className="form-control " type="text" disabled={true} defaultValue={EtudiantData[0].prenom } ></input>
                </div>
              </div>
            </div>
            <div className="profileBlockInfo row">
              <div className="col-6">
                <div>
                  <p> Date de naissance</p>
                  <input className="form-control " type="date" defaultValue={EtudiantData[0].dateNaissance} disabled={true}></input>
                </div>
              </div>
              <div className="col-6">
                <div>
                  <p> Lieu de naissance</p>
                  <input className="form-control " type="text" defaultValue={EtudiantData[0].lieuNaissance} disabled={true} ></input>
                </div>
              </div>
            </div>
            <div className="profileBlockInfo row">
              <div className="col-6">
                <div>
                  <p>Sexe</p>
                  <div className="">
                  <input className="form-check-input" type="radio"   checked={EtudiantData[0].sexe==="M"?true:false}   disabled={true}/><span>Homme</span>
                  <input className="form-check-input ms-3" type="radio"   checked={EtudiantData[0].sexe==="F"?true:false}  disabled={true}/><span>Femme</span>
                  </div>
                </div>
              </div>
              <div className='col-6'>
                <div>
                  <p>Numéro de téléphone</p>
                  <input className="form-control txt" type="text " name="tel" value={tel} disabled={modification?false:true} onChange={(e)=>setTel(e.target.value)}></input>
                </div>
              </div>
            </div>
            <div className="profileBlockInfo row">
              <div className='col-6'>
                <div>
                  <p> Nouveau Mot de passe</p>
                  <input className="form-control " type="password" name="newPassword" value={newPassword} disabled={modification?false:true}  onChange={(e)=>setNewPassword(e.target.value)}  ></input>
                </div>
              </div>
              <div className='col-6'>
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