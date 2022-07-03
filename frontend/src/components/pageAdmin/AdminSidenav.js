import React from "react";
import Sidenav from "../common/sidenav/Sidenav";
import SidenavItem from "../common/sidenav/SidenavItem";
import SidenavTitle from "../common/sidenav/SidenavTitle";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import {
  BsPersonCircle,
  BsPersonFill,
  BsPersonPlusFill,
  BsFillFileEarmarkSpreadsheetFill,
} from "react-icons/bs";
import { MdComputer } from "react-icons/md";
import { ImHammer2 } from "react-icons/im";
import { JuryData } from "../../constants/Constant";
import { useSelector } from "react-redux";

const AdminSidenav = () => {
  const files = useSelector((state) => state.dashboardDisplay);
  const display = files.adminClicked;

  return (
    <Sidenav
      acteur="ADMIN"
      nom={JuryData.nom}
      prenom={JuryData.prenom}
      display={display}
    >
      <SidenavTitle titre="">
        <SidenavItem>
          <Link to="/acteur/admin/dashboard">
            <MdDashboard className="me-3" /> DASHBOARD
          </Link>
        </SidenavItem>
        <SidenavItem>
          <Link to="/acteur/admin/liste-attente">
            <BsPersonPlusFill className="me-3" /> LISTE D'ATTENTE
          </Link>
        </SidenavItem>
        <SidenavItem>
          <Link to="/acteur/admin/liste-etudiants">
            <BsPersonFill className="me-3" /> LISTE DES ETUDIANTS
          </Link>
        </SidenavItem>
        <SidenavItem>
          <Link to="/acteur/admin/notes-lecture">
            <BsFillFileEarmarkSpreadsheetFill className="me-3" /> NOTE DE
            LECTURE
          </Link>
        </SidenavItem>
        <SidenavItem>
          <Link to="/acteur/admin/dossier-master">
            <BsFillFileEarmarkSpreadsheetFill className="me-3" /> DOSSIER MASTER
          </Link>
        </SidenavItem>
      </SidenavTitle>
      <SidenavTitle titre="Rapports">
        <SidenavItem>
          <Link to="/acteur/admin/rapport-audition">
            <ImHammer2 className="me-3" /> RAPPORT AUDITION
          </Link>
        </SidenavItem>
        <SidenavItem>
          <Link to="/acteur/admin/rapport-expertise">
            <MdComputer className="me-3" /> RAPPORT EXPERTISE
          </Link>
        </SidenavItem>
        <SidenavItem>
          <Link to="/acteur/admin/rapport-conseil">
            <BsPersonCircle className="me-3" /> RAPPORT CONSEIL
          </Link>
        </SidenavItem>
      </SidenavTitle>
      <SidenavTitle titre="Liste acteurs">
        <SidenavItem>
          <Link to="/acteur/admin/liste-jury">
            <ImHammer2 className="me-3" /> LISTE JURY
          </Link>
        </SidenavItem>
        <SidenavItem>
          <Link to="/acteur/admin/liste-departement">
            <MdComputer className="me-3" /> LISTE DEPARTEMENTS
          </Link>
        </SidenavItem>
        <SidenavItem>
          <Link to="/acteur/admin/liste-coordo">
            <BsPersonCircle className="me-3" /> LISTE COORDONATEURS
          </Link>
        </SidenavItem>
        <SidenavItem>
          <Link to="/acteur/admin/liste-conseil">
            <BsPersonCircle className="me-3" /> LISTE CONSEIL
          </Link>
        </SidenavItem>
        <SidenavItem>
          <Link to="/acteur/admin/liste-expert">
            <BsPersonCircle className="me-3" /> LISTE EXPERT
          </Link>
        </SidenavItem>
        <SidenavItem>
          <Link to="/acteur/admin/liste-rectorat">
            <BsPersonCircle className="me-3" /> LISTE RECTORAT
          </Link>
        </SidenavItem>
      </SidenavTitle>
    </Sidenav>
  );
};

export default AdminSidenav;
