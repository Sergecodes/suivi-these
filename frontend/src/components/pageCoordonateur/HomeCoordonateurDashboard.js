import React, { useState, useEffect } from "react";
import NavbarCoordonateur from "./NavbarCoordonateur";
import "../../Styles/coordonateurPage/index.css";
import SidebarCoordonateur from "./SidebarCoordonateur";
import { useNavigate } from "react-router-dom";

function HomeCoordonateurDashboard(props) {
  console.log(localStorage)
  const acteur = localStorage.getItem("actor");
  const coordonateur = acteur === 'coordonateur' ? JSON.parse(localStorage.getItem('user')) : null;
  const navigate = useNavigate();

  const dataRequired = () => {
    if (!coordonateur) {
      alert("Vous devez etre connecte pour acceder cette page");

      // alert("Vous devez etre connecte pour acceder cette page")
      navigate("/connexion/coordonateur");
    }
    // console.log(` les donnes qui viennent du localStorage soint${coodonateurInfos._id}`);
    // console.log(props);
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => {
    setSidebarOpen(true);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  useEffect(() => {
    dataRequired();
  }, [navigate, coordonateur]);
  return (
    <div className="containere">
      <NavbarCoordonateur sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <SidebarCoordonateur
        sidebarOpen={sidebarOpen}
        closeSidebar={closeSidebar}
      />
    </div>
  );
}

export default HomeCoordonateurDashboard;
