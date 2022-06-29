import { Table, Modal, Select, Button } from "antd";
import { useState, useEffect } from "react";
import axios from 'axios';
import moment from "moment";
import { toast, ToastContainer } from 'react-toastify'
import { BsPerson, BsPenFill, BsX, BsCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const { Option } = Select;


const TableListDepartement = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [listeJury, setListeJury] = useState([]);
  const [current, setCurrent] = useState(1);
  const [index, setIndex] = useState(1);
  const [modified, setModified] = useState(false);
  const [juryData, setJuryData] = useState((function () {
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
  })());
  const [selectedJury, setSelectedJury] = useState(juryData);
  const [tempJury, setTempJury] = useState([]);
  const [data, setData] = useState([{
    key: "1",
    photo: (
      <img
        src=""
        alt="cc"
        className="rounded-circle"
        style={{ width: "50px", height: "50px" }}
      />
    ),
    matricule: "",
    name: "",
    dateEnvoi: '',
    dateVerification: "---",
    jury: (function () {
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
    })(),
  }]);

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

  // useEffect(() => {
  //   Promise.all([
  //     axios.get(`/departements/dossiers-etudiants-master`),
  //     axios.get('/departements/notes-dossiers')
  //   ])
  //     .then(results => {
  //       const [res1, res2] = results;
  //       console.log(res1);
  //       console.log(res2);
  //       setData(parseResult(res1.data, res2.data));
  //     })
  //     .catch(err => {
  //       console.error(err);
  //       toast.error("Une erreur est survenue!", { hideProgressBar: true });
  //     })
  // }, []);

  // const parseResult = (envoisData, notesData) => {
  //   let result = [];
  //   for (let envoiObj of envoisData) {
  //     let etud = envoiObj.dossier.etudiant;
  //     let noteObj = notesData.find(note => note.dossier.id === envoiObj.dossier.id);

  //     result.push({
  //       key: envoiObj.id,
  //       photo: (
  //         <img
  //           src={etud.urlPhotoProfil}
  //           alt="profil"
  //           className="rounded-circle"
  //           style={{ width: "50px", height: "50px" }}
  //         />
  //       ),
  //       matricule: etud.matricule,
  //       name: etud.nom + ' '  + etud.prenom,
  //       dateEnvoi: moment(envoiObj.envoyeLe).format('dddd, D MMMM YYYY'),
  //       dateVerification: noteObj ? moment(noteObj.noteLe).format('dddd, D MMM YYYY') : '---'
  //     });
  //   }

  //   return result;
  // }
  
  const showModal = () => setIsModalVisible(true);

  const handleOk = () => {
    setIsModalVisible(false);
    setModified(false);
  };

  const handleChange = (value, option) => {
    let newListe = [...listeJury];
    newListe[index] = juryData.find(elt => elt.email === value);
    setTempJury(newListe);
  };

  return (
    <>
      <ToastContainer />
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
    </>
  );
};

export default TableListDepartement;
