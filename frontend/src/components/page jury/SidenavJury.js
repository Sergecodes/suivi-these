import React from 'react';
import Sidenav from '../common/sidenav/Sidenav';
import SidenavItem from '../common/sidenav/SidenavItem';
import { Link } from 'react-router-dom';
import {MdDashboard} from "react-icons/md"
import {BsBellFill, BsPersonFill,BsFillFileEarmarkSpreadsheetFill} from "react-icons/bs";
import "../../Styles/Sidenav.css";
import {JuryData} from "../../constants/Constant";
import {  useSelector } from "react-redux";


const SidenavJury = () => {
    const files = useSelector((state) => state.dashboardDisplay);
    const display=files.adminClicked;
  return (
    <Sidenav className="sidenavJury" acteur="Jury" nom={JuryData.nom} prenom={JuryData.prenom} display={display}>
        <SidenavItem>
            <Link to="/acteur/jury/dashboard"><MdDashboard className="me-2"/> DASHBOARD</Link>
        </SidenavItem>
        <SidenavItem>
            <Link to="/acteur/jury/notation"><BsFillFileEarmarkSpreadsheetFill className="me-2"/> NOTATION ETUDIANT</Link>
        </SidenavItem>
        <SidenavItem>
            <Link to="/acteur/jury/profil"><BsPersonFill className="me-2"/> EDITER PROFIL</Link>
        </SidenavItem>
        <SidenavItem>
            <Link to="/acteur/jury/nofications"><BsBellFill className="me-2"/> NOTIFICATIONS</Link>
        </SidenavItem>
      
    </Sidenav>
  )
}

export default SidenavJury