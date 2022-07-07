import { useState, useEffect } from "react";
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "../../Styles/AdminCommon.css";

const { confirm } = Modal;


const NotificationsActeurs = (props) => {
  // const notifs = [{
  //   id: "1",
  //   title: "Nouveau dossier envoyé",
  //   description: (
  //     <div>
  //       <p>
  //         Vous avez reçu une nouvelle demande de programmation de 
  //         date de soutenance venant de l'étudiant{" "}
  //         <Link to="">ATANGANA JEAN MBARGA HELENE</Link>
  //       </p>
  //     </div>
  //   ),
    // vueLe: '' or date int
  // }];

  console.log('props', props);
  // acteur and notifs should be passed as props
  const { acteur, notifs: allNotifs } = props;

  const [notifs, setNotifs] = [...allNotifs];
  const [clicked, setClicked] = useState(true);

  const handleClickTout = () => {
    setNotifs(allNotifs);
    setClicked(!clicked);
  }

  const handleClickNonLu = () => {
    // Set notifs to notifications that 
    setNotifs(notifs.filter(notif => Boolean(notif.vueLe) === false));
    setClicked(!clicked);
  }

  const handleClickEffacerTout = () => {
    // confirm({
    //   title: "Voulez-vouz valider la demande d'inscription de cet etudiant?",
    //   content: <span className="fw-bold">{etudiant.name} ({ etudiant.matricule })</span>,
    //   icon: <AiOutlineExclamationCircle style={{ color: '#F2AD16', fontWeight: 900 }} />,
    //   okText: 'Oui',
    //   cancelText: 'Non',
    //   async onOk() {
    //     return axios.put(`/admin/etudiants/${etudiant.id}/accepter-inscription`)
    //       .then(res => {
    //         console.log(res);
    //         toast.success("Succes!", { hideProgressBar: true });

    //         setTimeout(() => {
    //           toast.dismiss();
    //           navigate(0);
    //         }, 3000);
    //       })
    //       .catch(err => {
    //         console.error(err);
    //         toast.error("Une erreur est survenue!", { hideProgressBar: true });
    //       });
    //   },
    //   onCancel() {

    //   }
    // });
  }

  return (
    <section 
      className="mx-4 my-5 d-flex flex-column align-items-center row" 
      style={{ minHeight: "67vh" }}
    >
      <ToastContainer />
      <p className="fs-4 fw-bolder text-center mb-2">Notifications</p>
      <div className="col-12 col-md-10 d-flex justify-content-between actionsNotification">
        <div className="d-flex align-items-center ">
          <button
            type="button"
            className="btn rounded-pill px-4 py-1"
            onClick={handleClickTout}
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
            onClick={handleClickNonLu}
            style={
              clicked === false
                ? { backgroundColor: "#4b3a6e", color: "white" }
                : {}
            }
          >
            Non lu
          </button>
        </div>
        <p style={{ cursor: 'pointer' }} onClick={handleClickEffacerTout}>
          Effacer tout
        </p>
      </div>
      <div className="col-12 col-md-10">
        {notifs.map((notif) => (
          <div key={notif.id} className="contentNotification my-3 px-3 py-3">
            <h5>{notif.title}</h5>
            <div>{notif.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
};


NotificationsActeurs.propTypes = {
  notifs: PropTypes.array.isRequired,
  acteur: PropTypes.string.isRequired
}


export default NotificationsActeurs;
