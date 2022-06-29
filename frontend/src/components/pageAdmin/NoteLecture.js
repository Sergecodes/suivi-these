import React, { useState } from "react";
import { Table, Modal, Button } from "antd";
import { Link } from "react-router-dom";
import RejetEtudiant from "./RejetEtudiant";
import { useDispatch } from "react-redux";
import { setRejectModal } from "../../redux/DashboardDisplaySlice";

const Notation = () => {
  const columns = [
    {
      title: <div>Matricule</div>,
      dataIndex: "matricule",
      sorter: {
        compare: (a, b) => a.matricule.localeCompare(b.matricule),
      },
      align: "center",
    },
    {
      title: <div>Nom et Prenom</div>,
      dataIndex: "name",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
      },
      align: "center",
    },
    {
      title: <div>Note jury 1</div>,
      dataIndex: "firstJury",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
      },
      align: "center",
    },
    {
      title: <div>Note jury 2</div>,
      dataIndex: "secondJury",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
      },
      align: "center",
    },
    {
      title: <div>Note jury 3</div>,
      dataIndex: "thirdJury",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
      },
      align: "center",
    },
    {
      title: <div>Moyenne/60 </div>,
      dataIndex: "score",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
      },
      align: "center",
    },
    {
      title: <div>Actions</div>,
      render: (record) => {
        return (
          <div className="d-flex justify-content-between align-items-center ">
            <p
              className="details pt-2"
              onClick={() => {
                showModal();
                setEtudiant({ matricule: record.matricule, nom: record.name ,score:record.score});
              }}
            >
              plus de details
            </p>
            <Link
              to="/acteur/admin/rapport-soutenance"
              state={{
                etudiantInfo: { matricule: record.matricule, nom: record.name },
              }}
            >
              {" "}
              <button className="btn autorisationButton">Autoriser</button>
            </Link>
            <button
              className="btn rejectButton"
              onClick={() => {
                dispatch(setRejectModal({ choix: true }));
                setEtudiant({ matricule: record.matricule, nom: record.name });
              }}
            >
              Rejeter
            </button>
          </div>
        );
      },
      align: "center",
    },
  ];

  const data = [
    {
      key: "1",
      matricule: "19M2216",
      name: "Nom 1 prenom 1",
      firstJury: 40,
      secondJury: 50,
      thirdJury: 53,
      score: Math.floor((40 + 50 + 53) / 3),
    },
    {
      key: "2",
      matricule: "19M2217",
      name: "Nom 2 prenom 2",
      firstJury: 25,
      secondJury: 15,
      thirdJury: 20,
      score: (25 + 15 + 20) / 3,
    },
    {
      key: "3",
      matricule: "19M2218",
      name: "Nom 3 prenom 3",
      firstJury: 42,
      secondJury: 35,
      thirdJury: 49,
      score: (42 + 35 + 49) / 3,
    },
  ];

  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [etudiant, setEtudiant] = useState({});
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const listeJury = ["jury1@gmail.com", "jury2@gmail.com", "jury3@gmail.com"];

  return (
    <section className=" mx-3 my-3">
      <h5 className="text-center my-4">
        Notes attribuées par les différents jurys
      </h5>
      <Table
        columns={columns}
        dataSource={data}
        align="center"
        pagination={{ pageSize: 5 }}
      />
      <RejetEtudiant etudiant={etudiant} />
      <Modal
        title="ListeJury"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <button type="button" className="btn btnEmpty" onClick={handleCancel}>
            Retour
          </button>,
        ]}
      >
        <div>
          <p className="fs-5 fw-light text-center">
            Veuillez selectionner le jury dont vous voulez avoir les détails sur
            sa notation
          </p>
          {listeJury.map((elt, index) => {
            return (
              <div key={index}>
                <div className="d-flex justify-content-around align-items-center">
                  <p>{elt}</p>
                  <Link
                    to="/acteur/admin/detail-notation"
                    state={{
                      etudiantInfo: {
                        matricule: etudiant.matricule,
                        nom: etudiant.nom,
                        jury: elt,
                        score: etudiant.score
                      },
                    }}
                  >
                    {" "}
                    <p className="details">Voir les details</p>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </section>
  );
};

export default Notation;
