import { Table, Modal, message} from "antd";
import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";

const ListeCoordo = () => {
  const columns = [
    {
      title: <div className="text-center">Nom </div>,
      dataIndex: "name",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
      },
      align:"center"
    },
    {
      title: <div className="text-center">Prenom </div>,
      dataIndex: "surname",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
      },
      align:"center"
    },
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
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addCoordo, setAddCoordo] = useState({
    name: "",
    surname: "",
    email: "",
    motDePasse: "",
  });

  const [data, setData] = useState([
    {
      key: "1",
      name: "Nom 1",
      surname: "Prenom 1",
      email: "coordo@gmail.com",
      motDePasse:"coordo1"
    },
    {
      key: "2",
      name: "Nom 2",
      surname: "Prenom 2",
      email: "coordo1@gmail.com",
      motDePasse:"coordo"
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
    if ( addCoordo.name.trim().length!==0 || addCoordo.surname.trim().length!==0 ||addCoordo.email.trim().length!==0 ||addCoordo.motDePasse.trim().length!==0 ){
      let newData = [...data];
    let newCoordo=addCoordo;
    newCoordo={...newCoordo,"key":newData.length+1}
    newData.push(newCoordo);
    setData(newData);
     setAddCoordo({
      name:"",
      surname:"",
      email:"",
      motDePasse:"",
    })
    setIsModalVisible(false);
    message.success("ajout reussie")
    }
    else{
      message.error("une ou plusieurs cases manquantes")
    }
   
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    const name=e.target.name;
    const value=e.target.value;
    setAddCoordo({...addCoordo,[name]:value})
  }

  return (
    <div className=" mx-3 my-3">
      <div className="">
        <h3 className="text-center">LISTE COORDONATEURS</h3>
      </div>
      <div className="d-flex justify-content-center my-4">
        <button type="button" className="btn btnFull" onClick={showModal}>
          AJOUTER UN COORDONATEUR
        </button>
      </div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
      <Modal
        title="Ajout d'un coordonateur"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <div className="my-2">
            <label htmlFor="name" className="me-2 fs-6 fw-light">Nom: </label>
            <input type="text" name="name" value={addCoordo.name} onChange={e=>handleChange(e)}/>
          </div>
          <div className="my-2">
            <label htmlFor="surname" className="me-2 fs-6 fw-light">prenom: </label>
            <input type="text" name="surname" value={addCoordo.surname} onChange={e=>handleChange(e)}/>
          </div>
          <div className="my-2">
            <label htmlFor="email" className="me-2 fs-6 fw-light">Email: </label>
            <input type="email" name="email" value={addCoordo.email} onChange={e=>handleChange(e)}/>
          </div>
          <div className="my-2">
            <label htmlFor="motDePasse" className="me-2 fs-6 fw-light">Mot de passe: </label>
            <input type="text" name="motDePasse" value={addCoordo.motDePasse} onChange={e=>handleChange(e)}/>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ListeCoordo;

