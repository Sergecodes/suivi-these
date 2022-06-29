import React from "react";
import { Link } from "react-router-dom";
import NotificationsActeurs from "../common/NotificationsActeurs";

const notificationsAdmin = [
  {
    id: "1",
    title: "Nouveau dossier envoyé",
    description: (
      <div>
        <p>
          Vous avez reçu une nouveau dossier de memeoire venant de l'étudiant{" "}
          <Link to="/acteur/admin/dossier-these">
            ATANGANA JEAN MBARGA HELENE
          </Link>{" "}
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
          <Link to="/acteur/admin/dossier-these">
            ATANGANA JEAN MBARGA HELENE
          </Link>
          , est toujours en attente d'un avis, veuillez soummettre votre
          decision le plus tot possible
        </p>
      </div>
    ),
  },
  {
    id: "3",
    title: "Rapport d'expertise",
    description: (
      <div>
        <p>
          L'expert viens de soumettre son rapport d'expertise concernant le
          dossier de l'étudiant
          <Link to="/acteur/coordonateur/notation">
            ATANGANA JEAN MBARGA HELENE
          </Link>{" "}
          , vous pouvez le consulter désormais le consulter
        </p>
      </div>
    ),
  },
  {
    id: "",
    title: "Rapport d'audition",
    description: (
      <div>
        <p>
          Le coordonateur viens de soumettre son rapport d'audition concernant
          le dossier de l'étudiant
          <Link to="/acteur/coordonateur/notation">
            ATANGANA JEAN MBARGA HELENE
          </Link>{" "}
          , vous pouvez le consulter désormais le consulter
        </p>
      </div>
    ),
  },
];

const NotificationsAdmin = () => {
  return (
    <>
      <NotificationsActeurs notifications={notificationsAdmin} />
    </>
  );
};

export default NotificationsAdmin;
