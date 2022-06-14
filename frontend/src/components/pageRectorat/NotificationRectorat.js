import React from "react";
import { Link } from "react-router-dom";
import NotificationsActeurs from "../common/NotificationsActeurs";

const notificationRectorat = [
  {
    id: "1",
    title: "Nouveau dossier envoyé",
    description: (
      <div>
        <p>
          Vous avez reçu une nouvelle demande de programmation de date de soutenance venant de l'étudiant{" "}
          <Link to="/acteur/rectorat/profil">ATANGANA JEAN MBARGA HELENE</Link>{" "}
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
          <Link to="/acteur/rectorat/profil">ATANGANA JEAN MBARGA HELENE</Link>,
          est toujours en attente d'un avis, veuillez soummettre votre decision le plus tot possible
        </p>
      </div>
    ),
  },
];

const NotificationDepartement = () => {
  return (
    <>
      <NotificationsActeurs notifications={notificationRectorat}/>
    </>
  )
};

export default NotificationDepartement;
