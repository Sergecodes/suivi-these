import React from "react";
import { FaTimes, FaUserCheck } from "react-icons/fa";
import { BsFillDoorOpenFill } from 'react-icons/bs'
import { Link } from "react-router-dom";
import "../../Styles/coordonateurPage/index.css";
import axios from 'axios'
import "../../Styles/coordonateurPage/sidebar.css";
import { SidebarData } from "./SidebarDatas";
import { useNavigate } from "react-router-dom";

function SidebarCoordonateur({ sidebarOpen, closeSidebar }) {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    console.log("in logout")
    axios.post('/logout')
      .then(res => {
        console.log(res);
        localStorage.removeItem('user');
        localStorage.removeItem('actor');
        navigate("/");
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div id="sidebar" className={sidebarOpen ? "sidebar-responsive" : ""}>
      <div className="sidebar_title">
        <div className="sidebar_img">
          <img src="/dom-fou-YRMWVcdyhmI-unsplash (1).jpg" id="ppicture" />
          <h1>Jocelyn Pyw</h1>
        </div>
        <i
          onClick={() => {
            closeSidebar();
          }}
        >
          <FaTimes className="sidebarItem" id="sidebarbtn" />
        </i>
      </div>
      <div className="sidebar_menu">
        {SidebarData.map((val, key) => {
          return (
            <Link to={val.link} key={key} style={{ textDecoration: "none" }}>
              <div
                className="sidebar_link"
                id={
                  window.location.pathname == val.link ? "active_menu_link" : ""
                }
              >
                <i className="sidebarItem">{val.icon}</i>

                <a href="#">{val.title}</a>
              </div>
            </Link>
          );
        })}
        <div
          className="sidebar_link"
          onClick={handleLogout}
          style={{cursor: 'pointer'}}
        >
          <i className="sidebarItem"><BsFillDoorOpenFill /></i>
          Deconnexion
        </div>
      </div>
    </div>
  );
}

export default SidebarCoordonateur;
