import { Table, Modal, message } from "antd";
import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";

const ListeDepartement = () => {
  const listeUniteDeRecherche = ["MIBA", "CA", "BA"];

  const columns = [
    {
      title: <div className="text-center">Nom </div>,
      dataIndex: "name",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
      },
    },
    {
      title: <div className="text-center">Email</div>,
      dataIndex: "email",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
      },
    },
    {
      title: <div className="text-center">Mot de passe</div>,
      dataIndex: "motDePasse",
    },
    {
      title: <div className="text-center">Unite de recherche</div>,
      dataIndex: "uniteDeRecherche",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
      },
    },
    {
      title: "Actions",
      render: (record) => {
        return (
          <div className="d-flex fs-3 justify-content-center ">
            <BsTrash
              className="mx-1 correct"
              onClick={() => {
                handleDelete(record);
              }}
              style={{ color: "red" }}
            />
          </div>
        );
      },
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addDepartement, setAddDepartement] = useState({
    name: "",
    email: "",
    motDePasse: "",
    uniteRecherche: listeUniteDeRecherche[0],
  });

  const [data, setData] = useState([
    {
      key: "1",
      name: "Nom 1",
      email: "departement@gmail.com",
      motDePasse: "departement1",
      uniteDeRecherche: "MIBA",
    },
    {
      key: "2",
      name: "Nom 2",
      email: "departement1@gmail.com",
      motDePasse: "departement2",
      uniteDeRecherche: "CA",
    },
  ]);

  const handleDelete = (record) => {
    let newData = [...data];
    newData = newData.filter((elt) => elt.email !== record.email);
    setData(newData);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (
      addDepartement.name.trim().length !== 0 ||
      addDepartement.email.trim().length !== 0 ||
      addDepartement.motDePasse.trim().length !== 0
    ) {
      let newData = [...data];
      let newDepartement = addDepartement;
      newDepartement = { ...newDepartement, key: newData.length + 1 };
      newData.push(newDepartement);
      setData(newData);
      setAddDepartement({
        name: "",
        email: "",
        motDePasse: "",
        uniteRecherche: listeUniteDeRecherche[0],
      });
      setIsModalVisible(false);
      message.success("ajout reussie");
    } else {
      message.error("une ou plusieurs cases manquantes");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddDepartement({ ...addDepartement, [name]: value });
  };

  return (
    <div className=" mx-3 my-3">
      <div className="">
        <h3 className="text-center">LISTE DEPARTEMENT</h3>
      </div>
      <div className="d-flex justify-content-center my-4">
        <button type="button" className="btn btnFull" onClick={showModal}>
          AJOUTER UN DEPARTEMENT
        </button>
      </div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
      <Modal
        title="Ajout d'un departement"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <div className="my-2">
            <label htmlFor="name" className="me-2 fs-6 fw-light">
              Nom:{" "}
            </label>
            <input
              type="text"
              name="name"
              value={addDepartement.name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="my-2">
            <label htmlFor="email" className="me-2 fs-6 fw-light">
              Email:{" "}
            </label>
            <input
              type="email"
              name="email"
              value={addDepartement.email}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="my-2">
            <label htmlFor="motDePasse" className="me-2 fs-6 fw-light">
              Mot de passe:{" "}
            </label>
            <input
              type="text"
              name="motDePasse"
              value={addDepartement.motDePasse}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="my-2">
            <label htmlFor="uniteDeRecherche" className="me-2 fs-6 fw-light">
              Unite de recherche:{" "}
            </label>
            <select name="uniteDeRecherche" onChange={(e) => handleChange(e)}>
              {listeUniteDeRecherche.map((elt, index) => {
                return (
                  <option key={index} name={elt}>
                    {elt}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ListeDepartement;

//nom, prenom, mot de passe , email , grade , telephone , departement
