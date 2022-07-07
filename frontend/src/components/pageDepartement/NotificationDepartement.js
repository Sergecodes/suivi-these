import React from "react";
import { Link } from "react-router-dom";
import NotificationsActeurs from "../common/NotificationsActeurs";

const notificationsDepartement = [
  {
    id: "1",
    title: "Nouveau dossier envoyé",
    description: (
      <div>
        <p>
          L'étudiant{" "}
          <Link to="/acteur/departement/profil">ATANGANA JEAN MBARGA HELENE</Link>{" "}
          viens de soumettre son dossier de soutenance et est en attente d'une verification
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
          Le dossier de l'etudiant{" "}
          <Link to="/acteur/departement/profil">ATANGANA JEAN MBARGA HELENE</Link>,
          est toujours en attente d'un avis, veuillez soummettre votre decision le plus tot possible
        </p>
      </div>
    ),
  },
];

const NotificationDepartement = () => {
  return (
    <>
      <NotificationsActeurs notifs={notificationsDepartement}/>
    </>
  )
};

export default NotificationDepartement;
