import React, { useState } from "react";
import "../../Styles/AdminCommon.css";



const NotificationsActeurs = (props) => {
  const notifications=props.notifications;
  const [clicked, setClicked] = useState(true);
  return (
    <section className=" mx-4 my-5 d-flex flex-column align-items-center row" style={{minHeight:"67vh"}}>
      <p className="fs-4 fw-bolder text-center mb-2">Notification</p>
      <div className=" col-12 col-md-10 d-flex justify-content-between  actionsNotification">
        <div className="d-flex align-items-center ">
          <button
            type="button"
            className="btn rounded-pill px-4 py-1 "
            onClick={() => setClicked(!clicked)}
            style={
              clicked === true
                ? { backgroundColor: "#4b3a6e", color: "white" }
                : {}
            }
          >
            Tout
          </button>
          <button
            type="button"
            className="btn rounded-pill px-3 py-1 mx-3"
            onClick={() => setClicked(!clicked)}
            style={
              clicked === false
                ? { backgroundColor: "#4b3a6e", color: "white" }
                : {}
            }
          >
            Non lu{" "}
          </button>
        </div>
        <p>Effacer tout</p>
      </div>
      <div className="col-12 col-md-10 ">
        {notifications.map((notif) => {
          return (
            <div key={notif.id} className="contentNotification my-3 px-3 py-3 ">
              <h5> {notif.title}</h5>
              <div>{notif.description}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default NotificationsActeurs;
