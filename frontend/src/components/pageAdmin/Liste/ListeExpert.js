import { Table, Modal, message } from "antd";
import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";

const ListeExpert = () => {
  const listeTypeExpert = ["Type 1", "Type 2", "Type 3"];

  const listeGrade = ["Grade 1", "Grade 2"];

  const columns = [
    {
      title: <div className="text-center">Nom </div>,
      dataIndex: "name",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
      },
    },
    {
      title: <div className="text-center">Prenom </div>,
      dataIndex: "surname",
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
      title: <div className="text-center">Ville</div>,
      dataIndex: "ville",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
      },
    },
    {
      title: <div className="text-center">Grade</div>,
      dataIndex: "grade",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
      },
    },
    {
      title: <div className="text-center">Type</div>,
      dataIndex: "type",
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
  const [addExpert, setAddExpert] = useState({
    name: "",
    surname: "",
    email: "",
    motDePasse: "",
    ville: "",
    grade: listeGrade[0],
    type: listeTypeExpert[0],
  });

  const [data, setData] = useState([
    {
      key: "1",
      name: "Nom 1",
      surname: "Prenom 1",
      email: "jury@gmail.com",
      motDePasse: "Password1!",
      ville: "Douala",
      grade: "grade 1",
      type: "Type 1",
    },
    {
      key: "2",
      name: "Nom 2",
      surname: "Prenom 2",
      email: "jury2@gmail.com",
      motDePasse: "jury2",
      ville: "Yaoundé",
      grade: "grade 2",
      type: "Type 2",
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
      addExpert.ville.trim().length !== 0 ||
      addExpert.name.trim().length !== 0 ||
      addExpert.surname.trim().length !== 0 ||
      addExpert.email.trim().length !== 0 ||
      addExpert.motDePasse.trim().length !== 0
    ) {
      let newData = [...data];
      let newExpert = addExpert;
      newExpert = { ...newExpert, key: newData.length + 1 };
      newData.push(newExpert);
      setData(newData);
      setAddExpert({
        name: "",
        surname: "",
        email: "",
        motDePasse: "",
        ville: "",
        grade: listeGrade[0],
        type: listeTypeExpert[0],
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
    setAddExpert({ ...addExpert, [name]: value });
  };

  return (
    <div className=" mx-3 my-3">
      <div className="">
        <h3 className="text-center">LISTE EXPERTS</h3>
      </div>
      <div className="d-flex justify-content-center my-4">
        <button type="button" className="btn btnFull" onClick={showModal}>
          AJOUTER UN EXPERT
        </button>
      </div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
      <Modal
        title="Ajout d'un expert"
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
              value={addExpert.name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="my-2">
            <label htmlFor="surname" className="me-2 fs-6 fw-light">
              prenom:{" "}
            </label>
            <input
              type="text"
              name="surname"
              value={addExpert.surname}
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
              value={addExpert.email}
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
              value={addExpert.motDePasse}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="my-2">
            <label htmlFor="ville" className="me-2 fs-6 fw-light">
              Numero de telephone:{" "}
            </label>
            <input
              type="text"
              name="ville"
              value={addExpert.ville}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="my-2">
            <label htmlFor="grade" className="me-2 fs-6 fw-light">
              Grade:{" "}
            </label>
            <select name="grade" onChange={(e) => handleChange(e)}>
              {listeGrade.map((elt, index) => {
                return (
                  <option key={index} name={elt}>
                    {elt}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="my-2">
            <label htmlFor="type" className="me-2 fs-6 fw-light">
              Type expert:{" "}
            </label>
            <select name="type" onChange={(e) => handleChange(e)}>
              {listeTypeExpert.map((elt, index) => {
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

export default ListeExpert;
