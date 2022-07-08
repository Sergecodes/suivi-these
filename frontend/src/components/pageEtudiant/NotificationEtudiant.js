import { useEffect, useState } from "react";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import NotificationsActeurs from "../common/NotificationsActeurs";
import { ACTEURS } from "../../constants/Constant";


const NotificationsEtudiant = () => {
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    axios.get('/etudiants/notifications')
      .then(res => {
        console.log(res);
        setNotifs(parseResult(res.data));
      })
      .catch(err => {
        console.error(err);
        toast.error("Une erreur est survenue", { hideProgressBar: true });
      });
  }, []);

  const parseResult = (resData) => {
    let result = [];
    for (let notif of resData) {
      result.push({
        id: notif.id,
        type: notif.type,
        message: notif.message,
        creeLe: notif.creeLe,
        vueLe: notif.vueLe || '',
      });
    }

    return result;
  }

  return (
    <>
      <ToastContainer />
      <NotificationsActeurs notifs={notifs} acteur={ACTEURS.ETUDIANT} />
    </>
  );
};

export default NotificationsEtudiant;
