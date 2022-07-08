import { useEffect, useState } from "react";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import NotificationsActeurs from "../common/NotificationsActeurs";


// const notificationsAdmin = [
//   {
//     id: "1",
//     title: "Nouveau dossier envoyé",
//     description: (
//       <div>
//         <p>
//           Vous avez reçu une nouveau dossier de memeoire venant de l'étudiant{" "}
//           <Link to="/acteur/admin/dossier-these">
//             ATANGANA JEAN MBARGA HELENE
//           </Link>{" "}
//         </p>
//       </div>
//     ),
//   },
//   {
//     id: "2",
//     title: "Rappel delai d'envoi ",
//     description: (
//       <div>
//         <p>
//           Le dossier de l'etudiant{" "}
//           <Link to="/acteur/admin/dossier-these">
//             ATANGANA JEAN MBARGA HELENE
//           </Link>
//           , est toujours en attente d'un avis, veuillez soummettre votre
//           decision le plus tot possible
//         </p>
//       </div>
//     ),
//   },
//   {
//     id: "3",
//     title: "Rapport d'expertise",
//     description: (
//       <div>
//         <p>
//           L'expert viens de soumettre son rapport d'expertise concernant le
//           dossier de l'étudiant
//           <Link to="/acteur/coordonateur/notation">
//             ATANGANA JEAN MBARGA HELENE
//           </Link>{" "}
//           , vous pouvez le consulter désormais le consulter
//         </p>
//       </div>
//     ),
//   },
//   {
//     id: "",
//     title: "Rapport d'audition",
//     description: (
//       <div>
//         <p>
//           Le coordonateur viens de soumettre son rapport d'audition concernant
//           le dossier de l'étudiant
//           <Link to="/acteur/coordonateur/notation">
//             ATANGANA JEAN MBARGA HELENE
//           </Link>{" "}
//           , vous pouvez le consulter désormais le consulter
//         </p>
//       </div>
//     ),
//   },
// ];


const NotificationsAdmin = () => {
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    axios.get('/admin/notifications')
      .then(res => {
        console.log(res);
        setNotifs(parseResult(res.data));
      })
      .catch(err => {
        console.error(err);
        toast.error("Une erreur est survenue", { hideProgressBar: true });
      });
  }, []);

  const getDescription = (notif) => {
    // let type = notif.type;
    return '';
  }

  const getLink = (notif) => {
    return '';
  }

  const parseResult = (resData) => {
    let result = [];
    for (let notif of resData) {
      result.push({
        id: notif.id,
        title: notif.type,
        description: notif.message || getDescription(notif),
        vueLe: notif.vueLe || '',
        creeLe: notif.creeLe,
        redirectLink: getLink(notif) || ''
      });
    }

    return result;
  }

  return (
    <>
      <ToastContainer />
      <NotificationsActeurs notifs={notifs} />
    </>
  );
};

export default NotificationsAdmin;
