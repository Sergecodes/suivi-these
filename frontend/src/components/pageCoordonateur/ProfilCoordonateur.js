import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarCoordonateur from "./NavbarCoordonateur";
import SidebarCoordonateur from "./SidebarCoordonateur";
import "../../Styles/coordonateurPage/ProfilCoordonateur.css"
import { AiFillEdit } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { IoSend } from "react-icons/io5";
import { useDispatch} from 'react-redux'
import { changeEmailCoordonateur } from "../../redux/coordonateur/ChangePasswordCoordoSlice";

function ProfilCoordonateur() {
  const coodonateurInfos = JSON.parse(
    localStorage.getItem("coordonateurtInfo")
  );
   const [isDisable,setIsDisable] =useState(false)
  const [email,setEmail] =useState(false)

  const dispatch =useDispatch
  // const [motDePasse,setMotDePasse] =useState(false)
  const [user,setUser]=useState({
    actualPass:"",
    newPass:""
  })
  const navigate = useNavigate();
  const dataRequired = () => {
    if (coodonateurInfos == null) {
      alert("Vous devez etre connecte pour acceder cette page");

      navigate("/connexion/coordonateur");
    }
  };
 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => {
    setSidebarOpen(true);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  useEffect(() => {
    // dataRequired();
    console.log(`la valeur de user est ${user}`);
  }, [navigate, coodonateurInfos]);
  const handleSetPassword =()=>{
    alert(`la valeur de user est ${user.actualPass} et ${user.newPass}`)
    dispatch(changeEmailCoordonateur(user))
  }
  const [isAnnule,setIsAnnule]=useState(false)
  return (
    <div className="containere">
      <NavbarCoordonateur sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <SidebarCoordonateur
        sidebarOpen={sidebarOpen}
        closeSidebar={closeSidebar}
      />
      <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-md-3 "></div>
            <div className="col-md-6 ">
            <div className="input-box">
              <label htmlFor="email">Modifier l'email</label>   
                       <input className="" type="email" disabled={isDisable}  onChange={(e)=>setEmail(e.target.value)}></input>

            </div>
            <div className="input-box">
              <label htmlFor="password">Mot de pass actuel</label>   
                       <input className="" id="password" type="password" disabled={isDisable} onChange={(e)=>setUser({...user,actualPass:e.target.value})}></input>

            </div>
            <div className="input-box">
              <label htmlFor="newPassword"> Nouveau Mot de Passe</label>   
                       <input className=""  id="newPassword" type="Password" disabled={isDisable} onChange={(e)=>setUser({...user ,newPass:e.target.value})}></input>

            </div>
            {
              isDisable? ( <div className="btn-box input-box">
              
              <button className="btn btn-success" onClick={()=>setIsDisable(!isDisable) }>
                <AiFillEdit className="iconn"/>
                Editer Profil</button>
            </div>):""
            }
           
            {!isDisable? (
                <div className="btn-box input-box">
                <div className="container">
                  <div className="row container-btn-edit-or-annul">
                    <button className="col-md-5 btn btn-success" onClick={handleSetPassword}><IoSend className="iconn"/> Modifier</button>
                    <div  className="col-md-1"></div>
                    <button className="col-md-5 btn btn-danger" onClick={()=>setIsDisable(!isDisable)}> <ImCancelCircle className="iconn"/> annuler</button>
                  </div>
                </div>
                
              </div>
            ):""
              
            }
          
            </div>
            <div className="col-md-3 "></div>
           
          </div>
        </div>
        </div>
    </div>
  );
}

export default ProfilCoordonateur;
