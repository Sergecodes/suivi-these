import React from "react";
import { Link } from "react-router-dom";
import NotificationsActeurs from "../common/NotificationsActeurs";

const notificationsExpert = [
  {
    id: "1",
    title: "Nouvelle demande de Notation",
    description: (
      <div>
        <p>
          L'étudiant{" "}
          <Link to="/acteur/expert/profil">ATANGANA JEAN MBARGA HELENE</Link>{" "}
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
          <Link to="/acteur/expert/profil">ATANGANA JEAN MBARGA HELENE</Link>,
          veuillez le soummettre avant le 12/05/2022
        </p>
      </div>
    ),
  },
];

const NotificationExpert = () => {
  return (
    <>
      <NotificationsActeurs notifs={notificationsExpert}/>
    </>
  )
};

export default NotificationExpert;
