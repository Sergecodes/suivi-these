import React from "react";
import { FaTimes, FaUserCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../Styles/coordonateurPage/index.css";

import "../../Styles/coordonateurPage/sidebar.css";
import { SidebarData } from "./SidebarDatas";
const logo = require("../../assets/images/téléchargement.jpg");

function SidebarCoordonateur({ sidebarOpen, closeSidebar }) {
  //   console.log(window.location.pathname);
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
        {SidebarData.map((val, kez) => {
          return (
            <Link to={val.link} style={{ textDecoration: "none" }}>
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
      </div>
    </div>
  );
}

export default SidebarCoordonateur;
