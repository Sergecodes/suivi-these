import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { MdDownload } from "react-icons/md";
import NavbarCoordonateur from "./NavbarCoordonateur";
import SidebarCoordonateur from "./SidebarCoordonateur";
import '../../Styles/coordonateurPage/autorisationDeSoutenance.css'
const pdf = require("../../assets/images/image-pdf.jpg");

function AutorisationDeSoutenance() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => {
    setSidebarOpen(true);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  return (
    <div className="containere">
      <NavbarCoordonateur sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <SidebarCoordonateur
        sidebarOpen={sidebarOpen}
        closeSidebar={closeSidebar}
      />
      <div className="main">
        <div className="container">                <h1 className="first-autorisation-title">Tous vos Rapport D'auditons</h1>

          <div className="row">
            <div className="col-md-4">
              <div className="lettre-conatainer">
                <div className="title-section">
                  <h1>Rapport de Jules Henri</h1>
                  <p>Informatique</p>
                </div>
                <div className="body-section">
                  <img src={pdf} alt="logo de pdf"/>
                </div>
                <div className="footer-section">
                  <div>                <button className="btn-voir button"><AiFillEye/> Voir</button>
</div>
                  <div>                  <button className="btn-tele button"> <MdDownload/>Telecharger</button>
</div>


                </div>
              </div>
            </div>
          </div>
        </div>
        
        </div>;
    </div>
  );
}

export default AutorisationDeSoutenance;
