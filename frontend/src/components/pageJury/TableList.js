import { Table, Modal, Tooltip } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import { MdSend } from "react-icons/md";
import { BsEyeFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

moment.locale("fr");

const TableList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [detailNotation, setDetailNotation] = useState({});

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
          moment(a.initDateEnvoi).unix() - moment(b.initDateEnvoi).unix(),
      },
      align: "center",
    },
    {
      title: "Date Notation",
      dataIndex: "dateNotation",
      sorter: {
        compare: (a, b) =>
          moment(a.initDateNotation).unix() - moment(b.initDateNotation).unix(),
      },
      align: "center",
    },
    {
      title: <div>Statut</div>,
      render: (record) => {
        console.log(record);
        return (
          <div>
            <div
              style={record.dateNotation !== "---" ? { display: "none" } : {}}
            >
              <Link
                to="/acteur/jury/notation"
                state={{
                  etudiantInfo: {
                    matricule: record.matricule,
                    noms: record.name,
                    dossier: record.dossier,
                  },
                }}
              >
                <Tooltip
                  placement="bottom"
                  title="Attriuer une note à l'étudiant"
                  arrowPointAtCenter
                >
                  <button type="button" className="btn btnFull py-1">
                    <MdSend /> Notation
                  </button>
                </Tooltip>
              </Link>
            </div>
            <div
              style={record.dateNotation !== "---" ? {} : { display: "none" }}
            >
              <button
                type="button"
                className="btn details py-1"
                style={{
                  color: "green",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setDetailNotation({
                    matricule: record.matricule,
                    nom: record.name,
                    notes: record.notes,
                    total: record.total,
                  });
                  setIsModalVisible(true);
                }}
              >
                <Tooltip
                  placement="bottom"
                  title="Visualiser les notes attribuées à l'étudiant"
                  arrowPointAtCenter
                >
                  <BsEyeFill /> Visualiser
                </Tooltip>
              </button>
            </div>
          </div>
        );
      },
      align: "center",
    },
  ];

  const [data, setData] = useState([
    {
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
      dateEnvoi: "",
      initDateEnvoi: "",
      initDateNotation: 0,
      dateNotation: "---",
      dossier: {},
    },
  ]);

  useEffect(() => {
    Promise.all([
      axios.get(`/jury/dossiers-etudiants-master`),
      axios.get("/jury/notes-dossiers"),
    ])
      .then((results) => {
        const [res1, res2] = results;
        console.log(res1);
        console.log(res2);
        setData(parseResult(res1.data, res2.data));
      })
      .catch((err) => {
        console.error(err);
        toast.error("Une erreur est survenue!", { hideProgressBar: true });
      });
  }, []);

  const parseResult = (envoisData, notesData) => {
    let result = [];
    for (let envoiObj of envoisData) {
      let etud = envoiObj.dossier.etudiant;
      let noteObj = notesData.find(
        (note) => note.dossier.id === envoiObj.dossier.id
      );

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
        matricule: etud.matricule,
        name: etud.nom + " " + etud.prenom,
        initDateEnvoi: envoiObj.envoyeLe,
        dateEnvoi: moment(envoiObj.envoyeLe).format("dddd, D MMMM YYYY"),
        initDateNotation: noteObj ? noteObj.noteLe : 0,
        dateNotation: noteObj
          ? moment(noteObj.noteLe).format("dddd, D MMM YYYY")
          : "---",
        dossier: envoiObj.dossier,
        notes: noteObj.notes,
        total: noteObj.total,
      });
    }

    return result;
  };

  const handleNotes = (notes) => {
    let notesMemoire = [];
    for (let criteria in notes) {
      notesMemoire.push({
        critere: criteria,
        note: notes[criteria],
      });
    }
    return notesMemoire;
  };

  return (
    <>
      <ToastContainer />
      <div className=" mx-3 my-3">
        <div style={{ backgroundColor: "#2a1c5a", borderRadius: "10px" }}>
          <h5 className="text-center py-3" style={{ color: "white" }}>
            LISTE DES DOSSIERS ETUDIANTS
          </h5>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
        />
      </div>
      <Modal
        title={"Détails concernant la notation de l'étudiant " + detailNotation.nom}
        visible={isModalVisible}
        onOk={() => {
          setIsModalVisible(false);
        }}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        width="60vw"
        style={{ top: 0 }}
        footer={[
          <div key="close" className="d-flex justify-content-center my-2">
            <button
              className="btn btnEmpty"
              type="button"
              onClick={() => {
                setIsModalVisible(false);
              }}
            >
              OK
            </button>
          </div>,
        ]}
        destroyOnClose={true}
      >
        <div>
          {handleNotes(detailNotation.notes).map((elt, index) => {
            return (
              <div key={index}>
                <div
                  className="d-flex justify-content-around align-items-center row "
                  style={{ fontSize: "17px" }}
                >
                  <p
                    className="col-8 text-center "
                    style={{ fontStyle: "italic" }}
                  >
                    {elt.critere}
                  </p>
                  <p className="col-2 fw-bold">{elt.note}</p>
                </div>
              </div>
            );
          })}
          <p className="fw-bold text-center my-2 fs-5">
            Total: {detailNotation.total}
          </p>
        </div>
      </Modal>
    </>
  );
};

export default TableList;
