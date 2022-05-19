import React from "react";
import { AiOutlineClockCircle, AiOutlineSearch } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import "../../Styles/coordonateurPage/index.css";
import "../../Styles/coordonateurPage/NavbarCoordonateur.css";
const logo = require("../../assets/images/téléchargement.jpg");

function NavbarCoordonateur({ openSidebar, sidebarOpen }) {
  return (
    <div className="navbar">
      <div className="nav-icon" onClick={() => openSidebar()}>
        <i className="fabars">
          <FaBars />
        </i>
      </div>
      <div className="navbar_left">
        <div className="logoecole">
          <img src={logo} /> <p>Ecole Doctorale STG</p>
        </div>
      </div>
      <div className="navbar_right">
        <a href="#">
          <i>
            <AiOutlineSearch className="iconnav" />
          </i>
        </a>
        <a href="#">
          <i>
            <AiOutlineClockCircle className="iconnav" />
          </i>
        </a>
        <a href="#">{/* <img src={avatr}></img> */}</a>
      </div>
    </div>
  );
}

export default NavbarCoordonateur;
