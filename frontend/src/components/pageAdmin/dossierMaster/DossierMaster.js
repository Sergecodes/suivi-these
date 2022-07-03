import { Table, Modal, Select, Button } from "antd";
import { useState } from "react";
import moment from "moment";
import { BsPerson, BsX, BsCheck } from "react-icons/bs";
import { MdSend } from "react-icons/md";

const { Option } = Select;

const DossierMaster = () => {
  let defaultJuries = (function () {
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
  })();
  const juryData = defaultJuries;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [listeJury, setListeJury] = useState([]);
  const [current, setCurrent] = useState(1);
  const [index, setIndex] = useState(1);
  const [modified, setModified] = useState(false);
  const [selectedJury, setSelectedJury] = useState(juryData);
  // tempJury to backup choices after user closes page
  const [tempJury, setTempJury] = useState([]);
  const [data, setData] = useState([
    {
      key: "1",
      photo: (
        <img
          src=""
          alt="profil"
          className="rounded-circle"
          style={{ width: "50px", height: "50px" }}
        />
      ),
      matricule: "19M2214",
      name: "kuntz",
      dateEnvoi: "20-11-2021",
      dateVerification: "---",
      jury: defaultJuries,
    },
  ]);

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
      title: "Date Verification",
      dataIndex: "dateVerification",
      sorter: {
        compare: (a, b) =>
          moment(a.dateVerification).unix() - moment(b.dateVerification).unix(),
      },
      align: "center",
    },
    {
      title: "Actions",
      render: (record) => {
        return (
          <div className="d-flex fs-4 justify-content-around align-items-center">
            <BsPerson
              className="me-2"
              style={{ color: "#513e8f" }}
              onClick={() => {
                showModal();
                setListeJury(record.jury);
              }}
            />
            <button
              className="btn autorisationButton"
              onClick={() => {
                alert("envoi du dossier reussi");
              }}
            >
              <MdSend className="me-1"/> Envoyer
            </button>
          </div>
        );
      },
      align: "center",
    },
  ];

  const handleSubmit = () => {
    setListeJury(tempJury);
    setModified(false);
  };

  const showModal = () => setIsModalVisible(true);

  const handleOk = () => {
    setIsModalVisible(false);
    setModified(false);
  };

  const handleChange = (value, option) => {
    let newListe = [...listeJury];
    newListe[index] = juryData.find((elt) => elt.email === value);
    setTempJury(newListe);
  };

  return (
    <section className = "mt-4">
      <div className="tableTitleDisplay mx-3">
        <h5>DOSSIERS MASTER</h5>
        <p>
          Liste des étudiants de master envoyés par le departement
        </p>
      </div>
      <div className=" mx-3 my-3" >
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
        />
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
                          setSelectedJury(
                            (function () {
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
                                  juryData[i].email !==
                                    listeJury[first].email &&
                                  juryData[i].email !== listeJury[second].email
                                ) {
                                  output.push(juryData[i]);
                                }
                              }

                              return output;
                            })()
                          );
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
                          onClick={handleSubmit}
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
    </section>
  );
};

export default DossierMaster;
