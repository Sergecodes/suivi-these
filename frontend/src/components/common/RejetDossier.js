import React, { useState, useEffect } from "react";
import { Modal } from "antd";
// import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from "react-redux";
import { setRejectModal } from "../../redux/DashboardDisplaySlice";
import ReactQuill from "react-quill";
import { ACTEURS } from "../../constants/Constant";

const { confirm } = Modal;

const RejetDossier = (props) => {
  const { etudiant, acteur } = props;
  const files = useSelector((state) => state.dashboardDisplay);
  const navigate = useNavigate(), dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(files.rejectModal);
  const [value, setValue] = useState("");

  useEffect(() => {
    setIsModalVisible(files.rejectModal);
  }, [files.rejectModal]);

  // useEffect(() => {
  //   setIsModalVisible(props.isModalVisible);
  // }, [props.isModalVisible]);

  const handleOk = () => {
    console.log('value: ', value);
    if (value.trim() === '') {
      toast.error(
        "Vous devez entrer une raison pour le rejet du dossier", 
        { hideProgressBar: true }
      );

      return;
    }

    confirm({
      title: "Voulez-vous rejeter le dossier de cet etudiant?",
      icon: <AiOutlineExclamationCircle style={{ color: '#F2AD16' }} />,
      okText: 'Oui',
      okType: "danger",
      cancelText: 'Non',
      async onOk() {
        if (acteur === ACTEURS.ADMIN) {
          return axios.put(`/dossiers/${etudiant.idDossier}/rejeter`, {
            raison: value
          })
            .then(res => {
              // Close modal
              dispatch(setRejectModal());
              
              console.log(res);
              toast.success("Dossier rejete!", { hideProgressBar: true });
      
              // Close toasts after x seconds and refresh page
              setTimeout(() => {
                toast.dismiss();
                navigate(0);
              }, 3000);
            })
            .catch(err => {
              console.error(err);
              toast.error("Une erreur est survenue!", { hideProgressBar: true });
            });
        }
        
      },
      onCancel() {
        
      }
    });
  };

  const handleCancel = () => {
    dispatch(setRejectModal());
  };

  return (
    <Modal
      title="Rejet etudiant"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <div className="d-flex justify-content-between align-items-center">
          <button type="button" className="btn btnEmpty" onClick={handleCancel}>
            Retour
          </button>
          <button type="button" className="btn btnFull" onClick={handleOk}>
            Rejeter
          </button>
        </div>
      }
    >
      <div>
        <p className="fs-6 text-center">
          Vous ètes sur le point de rejeter le dossier de l'étudiant{" "}
          <span className="fw-bold">{etudiant.nom}</span> de matricule{" "}
          <span className="fw-bold">{etudiant.matricule}.</span> Veuillez
          spécifiier les raisons de votre rejet dans la case ci-dessous
        </p>
        <ReactQuill theme="snow"  onChange={setValue} />
      </div>
    </Modal>
  );
};

// RejetDossier.propTypes = {
//   etudiant: PropTypes.objectOf<{ nom: PropTypes.string }>.
// }

export default RejetDossier;
