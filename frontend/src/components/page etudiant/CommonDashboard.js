import React from 'react';
import {Link} from "react-router-dom"
import {EtudiantData} from '../../constants/EtudiantData';
import {BsFolder,BsPerson,BsArrowRepeat,BsBell} from "react-icons/bs";
import {BiRocket} from "react-icons/bi";
import {FiLogOut} from "react-icons/fi";

const CommonDashboard = (props) => {
    
  return (
    <section className="">
        <div className="commonDashboard">
            <div className="d-flex justify-content-around align-items-start py-4"  >
                <div className=" studentPicture"  >
                    <p >{EtudiantData[0].niveau}</p>
                    <img src={EtudiantData[0].urlPhotoProfil} alt=""/>
                </div>
                <div className="pe-2" style={{lineHeight:"0.4"}} >
                    <p className="" style={{fontWeight:'600'}}>{EtudiantData[0].nom}</p>
                    <p className="" style={{fontWeight:'570'}}>{EtudiantData[0].prenom}</p>
                    <p className="fst-italic" style={{}}>{EtudiantData[0].email}</p> 
                    <p className="fw-light" style={{}}>Unité: {EtudiantData[0].uniteRecherche.code}</p>

                </div>
            </div>
            <div className="  ">
                <div className="dashboardLinks " >
                    <p className="" >Tableau de bord</p>
                    <div className="d-flex flex-column">
                        <Link to="/account/depot" ><BsFolder/>   Depot dossier de soutenance</Link>
                       <Link to="/account/dossier"><BsArrowRepeat/>  Changement de sujet</Link>
                       <Link to="/account/dossier" ><BsArrowRepeat/>   Changement d'encadreur</Link>
                    </div>
                </div>
                <div className="dashboardLinks">
                    <p>Paramètres du compte</p>
                    <div className="d-flex flex-column">
                        <Link to="/account/profil" style={props.url==="/account/profil"?{color:"#ff5821",borderColor:"#ff5821"}:{}}><BsPerson/>  Editer Profil</Link>
                       <Link to="/account/evolution"><BiRocket/> Consulter l'évolution du dossier</Link>
                       <Link to="/*"><FiLogOut/> Deconnexion</Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CommonDashboard