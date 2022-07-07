import { Table, Modal, Select, Button, Tooltip } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";
import { BsPerson, BsX, BsCheck } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { ACTEURS } from "../../../constants/Constant";

const { Option } = Select;
const { confirm } = Modal;

const DossierMaster = () => {
  // let defaultJuries = (function () {
  //   let output = [];
  //   for (let i = 1; i <= 3; i++) {
  //     output.push({
  //       id: i,
  //       nom: "nom" + i,
  //       prenom: "prenom" + i,
  //       email: "jury" + i + "@gmail.com",
  //     });
  //   }
  //   return output;
  // })();

  // NOTE: juryData is an object with key <idDepartement> and values <array of juries>{id, nom, prenom, email}

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [juryData, setJuryData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal, setIsModal] = useState(false); //modal used to display the list of judges without any operations on them when the admin has already submited the judges
  const [listeJury, setListeJury] = useState([]);
  const [current, setCurrent] = useState(1);
  const [index, setIndex] = useState(1);
  const [modified, setModified] = useState(false);
  const [selectedJury, setSelectedJury] = useState([]);
  const [dossier, setDossier] = useState({});
  const [resetJuries, setResetJuries] = useState([]);
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
      dossier: {},
      matricule: "",
      name: "",
      departement: "",
      initDateEnvoi: "",
      dateEnvoi: "",
      initDateVerification: 0,
      dateVerification: "---",
      juries: [],
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
      title: "Departement",
      dataIndex: "departement",
      sorter: {
        compare: (a, b) => a.departement.localeCompare(b.departement),
      },
      align: "center",
    },
    {
      title: "Date Envoi",
      dataIndex: "dateEnvoi",
      sorter: {
        compare: (a, b) =>
          moment(a.initDateEnvoi).unix() - moment(b.initDateEnvoi).unix(),
      },
      align: "center",
    },
    {
      title: "Date Verification",
      dataIndex: "dateVerification",
      sorter: {
        compare: (a, b) =>
          moment(a.initDateVerification).unix() -
          moment(b.initDateVerification).unix(),
      },
      align: "center",
    },
    {
      title: "Actions",
      render: (record) => (
        <div className="d-flex fs-4 justify-content-around align-items-center">
          <div
            style={record.dateVerification !== "---" ? { display: "none" } : {}}
          >
            <Tooltip
              placement="bottom"
              title="Editer la liste des jury"
              arrowPointAtCenter
            >
              <BsPerson
                className="me-2 juryIcon"
                style={{ color: "#513e8f" }}
                onClick={() => {
                  showModal();
                  setListeJury(record.juries);
                  setDossier(record.dossier);
                  setResetJuries(record.juries);
                }}
              />
            </Tooltip>

            <Tooltip
              placement="bottom"
              title="Soumettre la liste des jury"
              arrowPointAtCenter
            >
              <button
                className="btn autorisationButton"
                onClick={(e) => handleSubmit(e, record.dossier)}
              >
                <MdSend className="me-1" /> Envoyer
              </button>
            </Tooltip>
          </div>
          <div>
            <div
              style={
                record.dateVerification !== "---" ? {} : { display: "none" }
              }
            >
              <Tooltip
                placement="bottom"
                title="Visualiser les jury attribués à l'étudiant"
                arrowPointAtCenter
              >
                <BsPerson
                  className="me-2 juryIcon"
                  style={{ color: "#513e8f" }}
                  onClick={() => {
                    setIsModal(true);
                    setListeJury(record.juries);
                  }}
                />
              </Tooltip>
            </div>
          </div>
        </div>
      ),
      align: "center",
    },
  ];

  useEffect(() => {
    Promise.all([
      axios.get(`/admin/dossiers-master`),
      // To get the dateVerification, we need to get the dossiers sent to the juries
      // from the admin and retrieve the envoyeLe attribute.
      // NOTE: use params instead of body since axios supports body only with put, post, patch, delete requests
      axios.get("/dossiers-envoyes", {
        params: {
          envoyePar: user.id,
          envoyeParModel: ACTEURS.ADMIN,
          destinataireModel: ACTEURS.JURY,
        },
      }),
      axios.get("/jury"),
    ])
      .then((results) => {
        const [res1, res2, res3] = results;
        console.log(res1);
        console.log(res2);
        console.log(res3);

        setJuryData(parseJuryResult(res3.data));
        setData(parseResult(res1.data, res2.data));
      })
      .catch((err) => {
        console.error(err);
        toast.error("Une erreur est survenue!", { hideProgressBar: true });
      });
  }, []);

  const parseJuryResult = (juries) => {
    let result = {};
    for (let jury of juries) {
      let idDepart = jury.departement.id;
      let juryObj = {
        id: jury.id,
        nom: jury.nom,
        prenom: jury.prenom,
        email: jury.email,
      };

      if (!(idDepart in result)) {
        result[idDepart] = [juryObj];
      } else {
        result[idDepart].push(juryObj);
      }
    }

    return result;
  };

  const parseResult = (envois1Data, envois2Data) => {
    let result = [];
    for (let envoiObj of envois1Data) {
      let dossier = envoiObj.dossier;
      let etud = dossier.etudiant;
      let envoi2Obj = envois2Data.find((obj) => obj.dossier.id === dossier.id);

      result.push({
        key: envoiObj.id,
        photo: (
          <img
            src={etud.urlPhotoProfil}
            alt="profil"
            className="rounded-circle"
            style={{ width: "50px", height: "50px" }}
          />
        ),
        dossier,
        matricule: etud.matricule,
        name: etud.nom + " " + etud.prenom,
        departement: etud.departement.nom,
        initDateEnvoi: envoiObj.envoyeLe,
        dateEnvoi: moment(envoiObj.envoyeLe).format("dddd, D MMMM YYYY"),
        // Use 0 here becuse when displaying the table, we'll use moment(0).unix() which gives 0
        // (no value)
        initDateVerification: envoi2Obj ? envoi2Obj.envoyeLe : 0,
        dateVerification: envoi2Obj
          ? moment(envoi2Obj.envoyeLe).format("dddd, D MMM YYYY")
          : "---",
        juries: etud.juges.map((jury) => {
          return {
            id: jury.id,
            nom: jury.nom,
            prenom: jury.prenom,
            email: jury.email,
          };
        }),
      });
    }

    return result;
  };

  const handleSubmit = (e, dossier) => {
    const etud = dossier.etudiant;

    confirm({
      title: "Envoyer le dossier de cet etudiant aux membres de jury?",
      content: (
        <span className="fw-bold">
          {etud.nom + " " + etud.prenom} ({etud.matricule})
        </span>
      ),
      icon: (
        <AiOutlineExclamationCircle
          style={{ color: "#F2AD16", fontWeight: 900 }}
        />
      ),
      okText: "Oui",
      cancelText: "Non",
      async onOk() {
        return Promise.all([
          axios.put(`/admin/etudiants/${etud.id}/set-juges`, {
            idDepartement: etud.departement,
            juges: listeJury.map((jury) => jury.id),
          }),
          axios.post(`/admin/etudiants/${etud.id}/envoyer-dossier-juges`),
        ])
          .then((results) => {
            const [res1, res2] = results;
            console.log(res1);
            console.log(res2);

            toast.success("Succes!", { hideProgressBar: true });

            setTimeout(() => {
              toast.dismiss();

              // Reload(re-render) page
              navigate(0);
            }, 3000);
          })
          .catch((err) => {
            console.error(err);
            toast.error("Une erreur est survenue!", { hideProgressBar: true });
          });
      },
      onCancel() {},
    });
  };

  const showModal = () => setIsModalVisible(true);

  const handleOk = () => {
    setIsModalVisible(false);
    setModified(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    let newData = [...data];
    for (let info of newData) {
      if (info.dossier.etudiant.id === dossier.etudiant.id) {
        info.juries = resetJuries;
      }
    }
    setData(newData);
  };
  const handleCheck = () => {
    let newData = [...data];
    for (let info of newData) {
      if (info.dossier.etudiant.id === dossier.etudiant.id) {
        info.juries = tempJury;
      }
    }
    setData(newData);
    setListeJury(tempJury);
    setModified(false);
  };

  const handleChange = (value, option) => {
    console.log(option);
    let newListe = [...listeJury];
    newListe[index] = juryData[dossier.etudiant.departement].find(
      (elt) => elt.email === value
    );
    setTempJury(newListe);
  };

  return (
    <section className="mt-4">
      <ToastContainer />
      <div className="tableTitleDisplay mx-3">
        <h5>DOSSIERS MASTER</h5>
        <p>Liste des étudiants de master envoyés par le departement</p>
      </div>
      <div className=" mx-3 my-3">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
        />
        <Modal
          title="ListeJury"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="submit" type="primary" onClick={handleOk}>
              OK
            </Button>,
          ]}
          destroyOnClose={true}
        >
          <div>
            {listeJury.map((jury, index) => (
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
                            }
                            if (index === 2) {
                              first = 0;
                              second = 1;
                            }

                            for (let idDepart in juryData) {
                              if (idDepart === dossier.etudiant.departement) {
                                let tempJuries = juryData[idDepart];

                                for (let jury of tempJuries) {
                                  if (
                                    jury.email !== listeJury[first].email &&
                                    jury.email !== listeJury[second].email
                                  ) {
                                    output.push(jury);
                                  }
                                }
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
                        onClick={handleCheck}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Modal>
      </div>
      <Modal
        title={"Liste des jury"}
        visible={isModal}
        onOk={() => {
          setIsModal(false);
        }}
        onCancel={() => {
          setIsModal(false);
        }}
        footer={[
          <div key="close" className="d-flex justify-content-center my-2">
            <button
              className="btn btnEmpty"
              type="button"
              onClick={() => {
                setIsModal(false);
              }}
            >
              OK
            </button>
          </div>,
        ]}
        destroyOnClose={true}
      >
        <div>
          {listeJury.map((jury) => (
            <div key={jury.id} className="text-center">
              <p className="fw-lighter fs-6">{jury.email}</p>
            </div>
          ))}
        </div>
      </Modal>
    </section>
  );
};

export default DossierMaster;
