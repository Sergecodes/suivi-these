import { Table } from "antd";
import axios from 'axios';
import { useState, useEffect } from "react";
import moment from "moment";
import { MdSend } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";
import { toast, ToastContainer } from 'react-toastify';
import { Link } from "react-router-dom";

moment.locale('fr');


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
          <div style={record.dateNotation !== "---" ? { display: "none" } : {}}>
            <Link
              to="/acteur/jury/notation"
              state={{
                etudiantInfo: {
                  matricule: record.matricule,
                  noms: record.name,
                  idDossier: record.idDossier
                }
              }}
            >
              <button
                type="button"
                className="btn py-1"
                style={{
                  color: "white",
                  cursor: "pointer",
                  backgroundColor: "var(--secondaryColor)",
                }}
              >
                <MdSend /> Notation
              </button>
            </Link>
          </div>
          <div style={record.dateNotation === "---" ? { display: "none" } : {}}>
            <Link
              to="/acteur/jury/notation"
              state={{
                etudiantInfo: {
                  matricule: record.matricule,
                  noms: record.name,
                  idDossier: record.idDossier
                }
              }}
            >
              <button
                type="button"
                className="btn py-1"
                style={{
                  color: "green",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                }}
              >
                <BsArrowRight /> Déja noté
              </button>
            </Link>
          </div>
        </div>
      );
    },
    align: "center",
  },
];

const TableList = () => {
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
      dateEnvoi: '',
      dateNotation: "---",
      idDossier: '1'
    },
  ]);

  useEffect(() => {
    Promise.all([
      axios.get(`/jury/dossiers-etudiants-master`),
      axios.get('/jury/notes-dossiers')
    ])
      .then(results => {
        const [res1, res2] = results;
        console.log(res1);
        console.log(res2);
        setData(parseResult(res1.data, res2.data));
      })
      .catch(err => {
        console.error(err);
        toast.error("Une erreur est survenue!", { hideProgressBar: true });
      })
  }, []);

  const parseResult = (envoisData, notesData) => {
    let result = [];
    for (let envoiObj of envoisData) {
      let etud = envoiObj.dossier.etudiant;
      let noteObj = notesData.find(note => note.dossier.id === envoiObj.dossier.id);

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
        name: etud.nom + ' ' + etud.prenom,
        initDateEnvoi: envoiObj.envoyeLe,
        dateEnvoi: moment(envoiObj.envoyeLe).format('dddd, D MMMM YYYY'),
        initDateNotation: moment(noteObj.noteLe),
        dateNotation: noteObj ? moment(noteObj.noteLe).format('dddd, D MMM YYYY') : '---',
        idDossier: envoiObj.dossier.id
      });
    }

    return result;
  }

  return (
    <>
      <ToastContainer />
      <div className=" mx-3 my-3" style={{ overflow: "scroll" }}>
        <div style={{ backgroundColor: "#2a1c5a", borderRadius: "10px" }}>
          <h5 className="text-center py-3" style={{ color: "white" }}>
            LISTE DES DOSSIERS ETUDIANTS
          </h5>
        </div>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
      </div>
    </>
  );
};

export default TableList;
