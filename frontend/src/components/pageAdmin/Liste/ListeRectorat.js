import { Table, Modal, message } from "antd";
import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";

const ListeRectorat = () => {
  const columns = [
    {
      title: <div className="text-center">Email</div>,
      dataIndex: "email",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
      },
      align:"center"
    },
    {
      title: <div className="text-center">Mot de passe</div>,
      dataIndex: "motDePasse",
      align:"center"
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
      align:"center"
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addRectorat, setAddRectorat] = useState({
    email: "",
    motDePasse: "",
  });

  const [data, setData] = useState([
    {
      key: "1",
      email: "rectorat@gmail.com",
      motDePasse: "rectorat1",
    },
    {
      key: "2",
      email: "rectorat1@gmail.com",
      motDePasse: "Password1",
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
      addRectorat.email.trim().length !== 0 ||
      addRectorat.motDePasse.trim().length !== 0
    ) {
      let newData = [...data];
      let newRectorat = addRectorat;
      newRectorat = { ...newRectorat, key: newData.length + 1 };
      newData.push(newRectorat);
      setData(newData);
      setAddRectorat({
        email: "",
        motDePasse: "",
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
    setAddRectorat({ ...addRectorat, [name]: value });
  };

  return (
    <div className=" mx-3 my-3">
      <div className="">
        <h3 className="text-center">LISTE RECTORATS</h3>
      </div>
      <div className="d-flex justify-content-center my-4">
        <button type="button" className="btn btnFull" onClick={showModal}>
          AJOUTER UN RECTORAT
        </button>
      </div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
      <Modal
        title="Ajout d'un rectorat"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <div className="my-2">
            <label htmlFor="email" className="me-2 fs-6 fw-light">
              Email:{" "}
            </label>
            <input
              type="email"
              name="email"
              value={addRectorat.email}
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
              value={addRectorat.motDePasse}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ListeRectorat;
