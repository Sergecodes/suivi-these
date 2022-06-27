import React from "react";
import { Link, useLocation ,useNavigate} from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { setClicked } from "../../redux/DashboardDisplaySlice";
import { useDispatch, useSelector } from "react-redux";
const logo= require('../../assets/images/téléchargement.jpg');

const NavbarEtudiant = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.dashboardDisplay);
  const location = useLocation();
  const navigate = useNavigate();
  function GetDashboardSection() {
    if (location.pathname === "/account/depot")
      return "Depot du dossier de soutenance";
    else if (location.pathname === "/account/evolution")
      return "Evolution du dossier de soutenance";
    else if (location.pathname === "/account/profil")
      return "Profil de l'étudiant";
    else if (location.pathname === "/account/changement-sujet")
      return "Changement de sujet";
    else if (location.pathname === "/account/changement-encadreur")
      return "Changement d'encadreur";
  }

  return (
    <section className="navHeaderElements d-flex justify-content-between align-items-center px-3">
      <div>
        <GiHamburgerMenu
          className="options me-2"
          onClick={() => {
            dispatch(setClicked());
          }}
          style={files.clicked === true ? { color: "var(--primaryColor)" } : {}}
        />
        <div className="d-flex align-items-center" style={{cursor:"pointer"}} onClick={()=>navigate('/')}>
            <img src={logo}  alt="logo"/>
            <span className="fs-3 ms-1 fw-bold" style={{color:"#242323"}}>Ecole Doctorale STG</span>
        </div>
      </div>
      <p className="fs-5" style={{margin:"0px",fontStyle:"italic"}}>{GetDashboardSection()}</p>
    </section>
  );
};

export default NavbarEtudiant;
