import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../Styles/Jury.css";

const notifications = [
  {
    id: "1",
    title: "Nouvelle demande de Notation",
    description: (
      <div>
        <p>
          L'étudiant{" "}
          <Link to="/acteur/jury/profil">ATANGANA JEAN MBARGA HELENE</Link>{" "}
          viens de soumettre sa thèse et est en attente d'une notation
        </p>
      </div>
    ),
  },
  {
    id: "2",
    title: "Rappel delai d'envoi ",
    description: (
      <div>
        <p>
          il vous reste 4 jours pour soummettre une note concernant le dossier
          de l'etudiant{" "}
          <Link to="/acteur/jury/profil">ATANGANA JEAN MBARGA HELENE</Link>,
          veuillez le soummettre avant le 12/05/2022
        </p>
      </div>
    ),
  },
];

const NotificationJury = () => {
  const [clicked, setClicked] = useState(true);
  return (
    <section className="notificationJury mx-4 my-5 d-flex flex-column align-items-center row">
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

export default NotificationJury;
