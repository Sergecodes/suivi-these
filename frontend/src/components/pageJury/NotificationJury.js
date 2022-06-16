import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NotificationsActeurs from "../common/NotificationsActeurs";
import axios from "axios";

const notificationsJury = [
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

  useEffect(()=>{
    axios.get("/jury/notifications",{withCredentials:true})
    .then(res=>{
      console.log(res);
    })
    .catch(err=>{
      console.error(err);
    })
  },[])
  return (
    <>
      <NotificationsActeurs notifications={notificationsJury}/>
    </>
  )
};

export default NotificationJury;
