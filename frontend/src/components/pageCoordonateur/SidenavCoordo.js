import React from 'react';
import Sidenav from '../common/sidenav/Sidenav';
import SidenavItem from '../common/sidenav/SidenavItem';
import SidenavTitle from '../common/sidenav/SidenavTitle';
import { Link } from 'react-router-dom';
import {MdDashboard} from "react-icons/md";
import {BsCalendarDateFill} from "react-icons/bs";
import {FaArrowRight} from "react-icons/fa"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {ImUsers} from "react-icons/im";
import {IoDocumentText} from "react-icons/io5";
import {JuryData} from "../../constants/Constant";
import {  useSelector } from "react-redux";


const CoordoSidenav = () => {
    const files = useSelector((state) => state.dashboardDisplay);
    const navigate = useNavigate();
    const display=files.coordoClicked;

    const handleLogout = () => {
        axios.post('/logout')
          .then(res => {
            console.log(res);
            localStorage.removeItem("user");
            localStorage.removeItem('actor');
            navigate('/');
          })
          .catch(err => {
            console.error(err);
          });
      }

  return (
    <Sidenav  acteur="COORDONATEUR" nom={JuryData.nom} prenom={JuryData.prenom} display={display}>
        <SidenavTitle titre="">
            <SidenavItem>
                <Link to="/acteur/coordonateur/dashboard"><MdDashboard className="me-3"/> DASHBOARD</Link>
            </SidenavItem>
            <SidenavItem>
                <Link to="/acteur/coordonateur/autorisation"><ImUsers className="me-3"/> AUTORISATION SOUTENANCE</Link>
            </SidenavItem>
            <SidenavItem>
                <Link to="/acteur/coordonateur/audition"><IoDocumentText className="me-3"/> RAPPORTS D'AUDITION</Link>
            </SidenavItem>
            <SidenavItem>
                <Link to="/acteur/coordonateur/date"><BsCalendarDateFill className="me-3"/> DATES SOUTENANCE</Link>
            </SidenavItem>
        </SidenavTitle>
        <SidenavTitle titre="">
            <SidenavItem>
                <p style={{ cursor: 'pointer' }} className="ms-2" onClick={handleLogout}>
                    <FaArrowRight className="me-3"/> DECONNEXION
                </p>
                
            </SidenavItem>
        </SidenavTitle>
      
    </Sidenav>
  )
}

export default CoordoSidenav