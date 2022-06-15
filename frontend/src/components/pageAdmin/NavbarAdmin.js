import React from 'react';
import {BsPersonFill, BsBellFill} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {GiHamburgerMenu} from "react-icons/gi";
import { setAdminClicked } from '../../redux/DashboardDisplaySlice';
const logo= require('../../assets/images/téléchargement.jpg');

const NavbarAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <section className="container adminNavbar py-1">
        <div className="d-flex justify-content-between align-items-center row">
          <div className="d-flex justify-content-around align-items-center col-4">
            <GiHamburgerMenu onClick={()=>dispatch(setAdminClicked())} style={{cursor:"pointer"}}/>
            <div className="d-flex align-items-center" style={{cursor:"pointer"}} onClick={()=>navigate('/')}>
                <img src={logo}  alt="logo"/>
                <span className="fs-4 ms-1">ECOLE DOCTORALE</span>
            </div>
          </div>
          <div className="d-flex fs-6 justify-content-around col-2">
            <BsPersonFill style={{cursor:"pointer"}}/>
            <BsBellFill  style={{cursor:"pointer"}}/>
          </div>
        </div>
    </section>
  )
}

export default NavbarAdmin