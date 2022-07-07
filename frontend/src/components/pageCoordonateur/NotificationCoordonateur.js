import React from "react";
import { Link } from "react-router-dom";
import NotificationsActeurs from "../common/NotificationsActeurs";

const notificationsCoordonateur = [
  {
    id: "1",
    title: "Nouveau dossier envoyé",
    description: (
      <div>
        <p>
          Vous avez reçu une nouvelle demande de programmation de date de soutenance venant de l'étudiant{" "}
          <Link to="/acteur/coordonateur/notation">ATANGANA JEAN MBARGA HELENE</Link>{" "}
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
          <Link to="/acteur/coordonateur/notation">ATANGANA JEAN MBARGA HELENE</Link>,
          est toujours en attente d'un avis, veuillez soummettre votre decision le plus tot possible
        </p>
      </div>
    ),
  },
  ,
  {
    id: "3",
    title: "Dossier etudiant thèse",
    description: (
      <div>
        <p>
          L'etudiant{" "}
          <Link to="/acteur/coordonateur/notation">ATANGANA JEAN MBARGA HELENE</Link> viens de soumettre son 
          dossier de thèse est en attente de notation
        </p>
      </div>
    ),
  },
];

const NotificationCoordonateur = () => {
  return (
    <>
      <NotificationsActeurs notifs={notificationsCoordonateur}/>
    </>
  )
};

export default NotificationCoordonateur;
