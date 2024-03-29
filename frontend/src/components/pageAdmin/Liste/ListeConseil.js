import { Table, Modal, message } from "antd";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { generatePassword } from '../../../utils';


const ListeConseil = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addConseil, setAddConseil] = useState({
    email: "",
    motDePasse: "",
  });
  const [data, setData] = useState([{
    key: "1",
    email: "conseil1@gmail.com"
  }]);

  const columns = [
    {
      title: <div className="text-center">Email</div>,
      dataIndex: "email",
      sorter: {
        compare: (a, b) => a.email.localeCompare(b.email),
      },
      align:"center"
    },
    {
      title: "Actions",
      render: (record) => (
        <div className="d-flex fs-3 justify-content-center ">
          <BsTrash
            className="mx-1 correct"
            onClick={() => {
              handleDelete(record);
            }}
            style={{ color: "red" }}
          />
        </div>
      ),
      align:"center"
    },
  ];

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
      addConseil.email.trim().length !== 0 ||
      addConseil.motDePasse.trim().length !== 0
    ) {
      let newData = [...data];
      let newConseil = { ...addConseil, key: newData.length + 1 };
      newData.push(newConseil);
      setData(newData);
      setAddConseil({
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
    setAddConseil({ ...addConseil, [name]: value });
  };

  return (
    <div className="mx-3 my-3">
      <ToastContainer />
      <div className="">
        <h3 className="text-center">LISTE CONSEIL</h3>
      </div>
      <div className="d-flex justify-content-center my-4">
        <button type="button" className="btn btnFull" onClick={showModal}>
          AJOUTER UN CONSEIL
        </button>
      </div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
      <Modal
        title="Ajout d'un conseil"
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
              value={addConseil.email}
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
              readOnly={true}
              value={addConseil.motDePasse}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ListeConseil;
