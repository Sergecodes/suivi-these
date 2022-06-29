import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setRejectModal } from "../../redux/DashboardDisplaySlice";
import ReactQuill from "react-quill";

const RejetEtudiant = (props) => {
  const files = useSelector((state) => state.dashboardDisplay);
  const [isModalVisible, setIsModalVisible] = useState(files.rejectModal);
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setIsModalVisible(files.rejectModal);
  }, [files.rejectModal]);

  useEffect(() => {
    setIsModalVisible(props.isModalVisible);
  }, [props.isModalVisible]);

  const handleOk = () => {
    dispatch(setRejectModal());
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
          <span className="fw-bold">{props.etudiant.nom}</span> de matricule{" "}
          <span className="fw-bold">{props.etudiant.matricule}.</span> Veuillez
          spécifiier les raisons de votre rejet dans la case ci-dessous
        </p>
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </div>
    </Modal>
  );
};

export default RejetEtudiant;
