import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import moment from 'moment';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import { Dropdown, Menu, Space } from "antd";
import { ACTEURS, TypeNotification } from "../../constants/Constant";
import "../../Styles/AdminCommon.css";

const TypeNotif = TypeNotification;
moment.locale('fr');


const NotificationsActeurs = (props) => {
  // const notifs = [{
  //   id: "1",
  //   type: "Nouveau dossier envoyé",
  //   message: `
  //     Vous avez reçu une nouvelle demande de programmation de
  //     date de soutenance venant de l'étudiant`,
  //   creeLe: formatted date string
  //   vueLe: '' or date string,
  // }];

  console.log("props", props);
  // acteur and notifs should be passed as props
  const { acteur, notifs: allNotifs } = props;

  const [notifs, setNotifs] = useState(props.notifs);
  const [clicked, setClicked] = useState(true);
  const [current, setCurrent] = useState({});

  const handleSelectTout = () => {
    setNotifs(allNotifs);
    setClicked(!clicked);
  };

  const handleSelectNonLu = () => {
    // Set notifs to notifications that
    setNotifs(notifs.filter((notif) => Boolean(notif.vueLe) === false));
    setClicked(!clicked);
  };

  const handleMarquerLu = () => {
    axios.put(`notifications/${current.id}/marquer-lu`)
      .then(res => {
        console.log(res);
        toast.success("Marquée lu", { hideProgressBar: true });

        // Update 'vueLe' attribute of notif 
        setNotifs((function () {
          let output = [];
          for (let notif of notifs) {
            if (notif.id === current.id) {
              notif.vueLe = res.data.vueLe;
            }
            output.push(notif);
          }

          return output;
        })());
      })
      .catch(err => {
        console.error(err);
        toast.error("Une erreur est survenue", { hideProgressBar: true });
      });
  }

  const handleSupprimer = () => {
    axios.delete(`notifications/${current.id}`)
      .then(res => {
        console.log(res);
        toast.success("Supprimée", { hideProgressBar: true });

        // Remove notif from list of notifs
        setNotifs(notifs.filter(notif => notif.id !== current.id));
      })
      .catch(err => {
        console.error(err);
        toast.error("Une erreur est survenue", { hideProgressBar: true });
      });
  }

  const getDescription = (notif) => {
    // let type = notif.type;

    return notif.message;
  }

  const getNotifLink = (notif) => {

    if (notif.type === TypeNotif.NOUVEAU_ETUDIANT) {
      if (acteur === ACTEURS.ADMIN)
        return '/...'
    }

    // Pas de lien
    return '';
  }

  const menu = (
    <Menu items={[
        {
          type: "divider",
          label: (
            <p onClick={handleMarquerLu} style={current.vueLe ? { display: 'none' } : {}}>
              Marquer comme lu
            </p>
          ),
          key: "marquerLu",
        },
        {
          type: "divider",
          danger: true,
          label: (
            <p onClick={handleSupprimer}>
              Supprimer la notification
            </p>
          ),
          key: "supprimer",
        },
      ]}
    />
  );

  const getNotifDisplay = (notif) => {
    const render = (
      <div
        key={notif.id}
        className={`
          contentNotification my-3 px-3 py-3 
          ${notif.vueLe ? '' : 'bg-info bg-gradient'}
        `}
        style={{ position: "relative" }}
      >
        <div style={{ position: "absolute", right: "3%", top: "0%" }}>
          <Dropdown overlay={menu} trigger={["click", "contextMenu"]}>
            <span onClick={() => setCurrent(notif)} style={{ cursor: 'pointer' }}>
              <Space
                className="fs-3"
                style={{ color: "var(--secondaryColor)" }}
              >
                ...
              </Space>
            </span>
          </Dropdown>
        </div>
        <h5>{notif.type}</h5>
        <div>
          <p>{getDescription(notif)}</p>
        </div>
        <p>{moment(notif.creeLe).format("dddd, D MMMM YYYY")}</p>
      </div>
    );

    let link = getNotifLink(notif);

    if (link) {
      return <Link to={link}>{render}</Link>;
    } else {
      return render;
    }
  }

  return (
    <section
      className="mx-4 my-5 d-flex flex-column align-items-center row"
      style={{ minHeight: "67vh" }}
    >
      <ToastContainer />
      <p className="fs-4 fw-bolder text-center mb-2">Notifications</p>
      <div className="col-12 col-md-10 d-flex justify-content-between actionsNotification">
        <div className="d-flex flex-start align-items-center ">
          <button
            type="button"
            className="btn rounded-pill px-4 py-1"
            onClick={handleSelectTout}
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
            onClick={handleSelectNonLu}
            style={
              clicked === false
                ? { backgroundColor: "#4b3a6e", color: "white" }
                : {}
            }
          >
            Non lu
          </button>
        </div>
      </div>
      <div className="col-12 col-md-10">
        {notifs.map((notif) => getNotifDisplay(notif))}
      </div>
    </section>
  );

};

NotificationsActeurs.propTypes = {
  notifs: PropTypes.array.isRequired,
  acteur: PropTypes.string.isRequired,
};

export default NotificationsActeurs;
