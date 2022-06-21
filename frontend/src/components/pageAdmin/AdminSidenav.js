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
                <Link to="/acteur/admin/liste-attente"><BsFillFileEarmarkSpreadsheetFill className="me-3"/> LISTE D'ATTENTE</Link>
            </SidenavItem>
            <SidenavItem>
                <Link to="/acteur/admin/liste-etudiants"><BsFillFileEarmarkSpreadsheetFill className="me-3"/> LISTE DES ETUDIANTS</Link>
            </SidenavItem>
            <SidenavItem>
                <Link to="/acteur/admin/notes-lecture"><BsFillFileEarmarkSpreadsheetFill className="me-3"/> NOTE DE LECTURE</Link>
            </SidenavItem>
        </SidenavTitle>
        <SidenavTitle titre="Liste">
            <SidenavItem>
                <Link to="/acteur/admin/liste-jury"><BsPersonFill className="me-3"/> LISTE JURY</Link>
            </SidenavItem>
            <SidenavItem>
                <Link to="/acteur/admin/liste-departement"><BsBellFill className="me-3"/> LISTE DEPARTEMENT</Link>
            </SidenavItem>
        </SidenavTitle>
      
    </Sidenav>
  )
}

export default AdminSidenav