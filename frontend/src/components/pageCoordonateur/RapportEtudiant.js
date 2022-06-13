import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import NavbarCoordonateur from "./NavbarCoordonateur";
import SidebarCoordonateur from "./SidebarCoordonateur";

function RapportEtudiant() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => {
    setSidebarOpen(true);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  const coodonateurInfos = JSON.parse(
    localStorage.getItem("coordonateurtInfo")
  );
  const dataRequired = () => {
    if (coodonateurInfos == null) {
      alert("Vous devez etre connecte pour acceder cette page");

      // alert("Vous devez etre connecte pour acceder cette page")
      navigate("/connexion/coordonateur");
    }
  };

  useEffect(() => {
    dataRequired();
  }, [navigate, coodonateurInfos]);
  return (
    <div className="containere">
      <NavbarCoordonateur sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <SidebarCoordonateur
        sidebarOpen={sidebarOpen}
        closeSidebar={closeSidebar}
      />
      <div className="main">RapportEtudiant</div>;
    </div>
  );
}

export default RapportEtudiant;
