import React, { useState, useEffect } from "react";
import NavbarCoordonateur from "./NavbarCoordonateur";
import SidebarCoordonateur from "./SidebarCoordonateur";
import { useNavigate } from "react-router-dom";
import '../../Styles/coordonateurPage/notifications.css'
import { AiTwotoneDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../redux/CooordonateurManagmentSllice";


function NotificationCoordonateur() {
  const coodonateurInfos = JSON.parse(
    localStorage.getItem("coordonateurtInfo")
  );

  const dataRequired = () => {
    if (coodonateurInfos == null) {
      alert("Vous devez etre connecte pour acceder cette page");

      navigate("/connexion/coordonateur");
    }
  };
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => {
    setSidebarOpen(true);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  useEffect(() => {
    // dataRequired();
    dispatch(getNotifications())
  }, [navigate, coodonateurInfos]);
  return (
    <div className="containere">
      <NavbarCoordonateur sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <SidebarCoordonateur
        sidebarOpen={sidebarOpen}
        closeSidebar={closeSidebar}
      />
      <div className="main">
        <div className="container">
          <div className="row">
            <div className="btn-container">
              <button className="btn-success">message lus</button>
              <button className="btn-warning">message non lus</button>
            </div>
            <hr className="ligne"></hr>
          </div>

          </div>
          <div className="lu-notifications container-fluid">
            {/* <div className=""></div> */}
            
                <div className="notification-item ">
                  <p>je ne suis pas aid</p>
                  <div>
                  <button className="btn btn-danger delete-notification-btn" ><AiTwotoneDelete  className="delete-icon"/></button>
                  <button className="btn-lu">Marquer comme lu</button>

                  </div>
                </div>
              {/* new item */}
                <div className="notification-item ">
                  <p>je ne suis pas aid</p>
                  <div>
                  <button className="btn btn-danger delete-notification-btn" ><AiTwotoneDelete  className="delete-icon"/></button>
                  <button className="btn-lu">Marquer comme lu</button>

                  </div>
                </div>
              {/* new item */}
                <div className="notification-item ">
                  <p>je ne suis pas aid</p>
                  <div>
                  <button className="btn btn-danger delete-notification-btn" ><AiTwotoneDelete  className="delete-icon"/></button>
                  <button className="btn-lu">Marquer comme lu</button>

                  </div>
                </div>
              {/* new item */}
                <div className="notification-item ">
                  <p>je ne suis pas aid</p>
                  <div>
                  <button className="btn btn-danger delete-notification-btn" ><AiTwotoneDelete  className="delete-icon"/></button>
                  <button className="btn-lu">Marquer comme lu</button>

                  </div>
                </div>
              {/* new item */}
                <div className="notification-item ">
                  <p>je ne suis pas aid</p>
                  <div>
                  <button className="btn btn-danger delete-notification-btn" ><AiTwotoneDelete  className="delete-icon"/></button>
                  <button className="btn-lu">Marquer comme lu</button>


                  </div>
                </div>
              {/* new item */}
                <div className="notification-item ">
                  <p>je ne suis pas aid</p>
                  <div>
                    <button className="btn btn-danger delete-notification-btn" ><AiTwotoneDelete  className="delete-icon"/></button>
                    
                                      <button className="btn-lu ">Marquer comme lu</button>

                  </div>
                </div>
              {/* new item */}
             





              </div>

        
        
        
        </div>
    </div>
  );
}

export default NotificationCoordonateur;
