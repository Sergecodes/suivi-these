import { Table, Modal, Select, Button } from "antd";
import React, { useState } from "react";
import moment from "moment";
import { BsPerson, BsPenFill, BsX, BsCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const TableListDepartement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [listeJury, setListeJury] = useState([]);
  const { Option } = Select;
  const navigate = useNavigate();

  const columns = [
    {
      title: "Photo ",
      dataIndex: "photo",
      align: "center",
    },
    {
      title: "Matricule",
      dataIndex: "matricule",
      sorter: {
        compare: (a, b) => a.matricule.localeCompare(b.matricule),
      },
      align: "center",
    },
    {
      title: "Nom et Prenom",
      dataIndex: "name",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
      },
      align: "center",
    },
    {
      title: "Date Envoi",
      dataIndex: "dateEnvoi",
      sorter: {
        compare: (a, b) =>
          moment(a.dateEnvoi).unix() - moment(b.dateEnvoi).unix(),
      },
      align: "center",
    },
    {
      title: "Date Notation",
      dataIndex: "dateNotation",
      sorter: {
        compare: (a, b) =>
          moment(a.dateEnvoi).unix() - moment(b.dateEnvoi).unix(),
      },
      align: "center",
    },
    {
      title: "Actions",
      render: (record) => {
        return (
          <div className="d-flex fs-4 justify-content-around ">
            <BsPerson
              className="me-2"
              style={{ color: "#513e8f" }}
              onClick={() => {
                showModal();
                setListeJury(record.jury);
              }}
            />
            <BsPenFill
              style={{ color: "#513e8f" }}
              onClick={() => {
                navigate("/acteur/departement/verification");
              }}
            />
          </div>
        );
      },
      align: "center",
    },
  ];
  var today = new Date();

  const [data, setData] = useState([
    {
      key: "1",
      photo: (
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1nf1W7VULCSp751rP0AxpCPvOzoN9XKDO0Q&usqp=CAU"
          alt="cc"
          className="rounded-circle"
          style={{ width: "50px", height: "50px" }}
        />
      ),
      matricule: "19M1234",
      name: "nom 1 prenom 1",
      dateEnvoi: today.toLocaleString("en-US"),
      dateNotation: "---",
      jury: function () {
        let output = [];
        for (let i = 1; i <= 3; i++) {
          output.push({
            id: i,
            nom: "nom" + i,
            prenom: "prenom" + i,
            email: "jury" + i + "@gmail.com",
          });
        }
        return output;
      },
    },
  ]);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setModified(false);
  };

  
  const [current, setCurrent] = useState(1);
  const [index, setIndex] = useState(1);

  const [modified, setModified] = useState(false);
  const [juryData, setJuryData] = useState(function () {
    let output = [];
    for (let i = 1; i < 6; i++) {
      output.push({
        id: i,
        nom: "nom" + i,
        prenom: "prenom" + i,
        email: "jury" + i + "@gmail.com",
      });
    }
    return output;
  });
  const [selectedJury, setSelectedJury] = useState(juryData);
  const [tempJury, setTempJury] = useState([]);
  const handleChange = (value, option) => {
    let newListe = [...listeJury];
    newListe[index] = juryData.filter((elt) => elt.email === value);
    newListe[index] = newListe[index][0];
    setTempJury(newListe);
  };

  return (
    <div className=" mx-3 my-3" style={{ overflow: "scroll" }}>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
      <Modal
        title="ListeJury"
        visible={isModalVisible}
        onOk={handleOk}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <div>
          {listeJury.map((jury, index) => {
            return (
              <div key={jury.id}>
                {!(modified && current === jury.id) ? (
                  <div className="d-flex align-items-center justify-content-around">
                    <p className="fw-lighter fs-6">{jury.email}</p>
                    <p
                      style={
                        modified === true
                          ? { display: "none" }
                          : { color: "#513e8f", cursor: "pointer" }
                      }
                      onClick={() => {
                        setModified(!modified);
                        setIndex(index);
                        setCurrent(jury.id);
                        setSelectedJury(function () {
                          let output = [],
                            first = 1,
                            second = 2;
                          if (index === 1) {
                            first = 0;
                            second = 2;
                            console.log("enter");
                          }
                          if (index === 2) {
                            first = 0;
                            second = 1;
                          }
                          for (let i in juryData) {
                            if (
                              juryData[i].email !== listeJury[first].email &&
                              juryData[i].email !== listeJury[second].email
                            ) {
                              output.push(juryData[i]);
                            }
                          }

                          return output;
                        });
                      }}
                    >
                      Modifier
                    </p>
                  </div>
                ) : (
                  <div className="d-flex align-items-center justify-content-around my-1">
                    {
                      <Select
                        defaultValue={selectedJury[0].email}
                        onChange={(value, option) =>
                          handleChange(value, option)
                        }
                      >
                        {selectedJury.map((elt) => {
                          return (
                            <Option key={elt.id} value={elt.email}>
                              {elt.email}
                            </Option>
                          );
                        })}
                      </Select>
                    }
                    <div className="fs-3">
                      <BsX
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => setModified(false)}
                      />
                      <BsCheck
                        className="ms-2"
                        style={{ color: "green", cursor: "pointer" }}
                        onClick={() => {
                          setListeJury(tempJury);
                          setModified(false);
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

export default TableListDepartement;
