import React from 'react';
import Sidenav from '../common/sidenav/Sidenav';
import SidenavItem from '../common/sidenav/SidenavItem';
import SidenavTitle from '../common/sidenav/SidenavTitle';
import { Link } from 'react-router-dom';
import {MdDashboard} from "react-icons/md";
import {BsBellFill, BsPersonFill,BsFillFileEarmarkSpreadsheetFill} from "react-icons/bs";
import {JuryData} from "../../constants/Constant";
import {  useSelector } from "react-redux";


const AdminSidenav = () => {
    const files = useSelector((state) => state.dashboardDisplay);
    const display=files.adminClicked;
  return (
    <Sidenav  acteur="ADMIN" nom={JuryData.nom} prenom={JuryData.prenom} display={display}>
        <SidenavTitle titre="">
            <SidenavItem>
                <Link to="/acteur/admin/dashboard"><MdDashboard className="me-3"/> DASHBOARD</Link>
            </SidenavItem>
            <SidenavItem>
                <Link to="/acteur/admin/notation"><BsFillFileEarmarkSpreadsheetFill className="me-3"/> NOTATION ETUDIANT</Link>
            </SidenavItem>
        </SidenavTitle>
        <SidenavTitle titre="loic">
            <SidenavItem>
                <Link to="/acteur/admin/profil"><BsPersonFill className="me-3"/> EDITER PROFIL</Link>
            </SidenavItem>
            <SidenavItem>
                <Link to="/acteur/admin/notifications"><BsBellFill className="me-3"/> NOTIFICATIONS</Link>
            </SidenavItem>
        </SidenavTitle>
      
    </Sidenav>
  )
}

export default AdminSidenav