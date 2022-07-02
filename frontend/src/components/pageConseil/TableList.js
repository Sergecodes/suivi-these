import { Table } from "antd";
import { useState } from "react";
import moment from "moment";
import { BsEyeFill,BsPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";

moment.locale("fr");

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
    title: <div>Statut</div>,
    render: (record) => {
      console.log(record);
      return (
        <div className="d-flex justify-content-around align-items-center ">
          <Link
            to="/acteur/conseil/visualiser"
            state={{
              etudiantInfo: {
                matricule: record.matricule,
                noms: record.name,
                idDossier: record.idDossier,
              },
            }}
          >
            <p className="details pt-2">
              <BsEyeFill className="me-2" /> Visualiser
            </p>
          </Link>
          <Link
            to="/acteur/conseil/notation"
            state={{
              etudiantInfo: {
                matricule: record.matricule,
                noms: record.name,
                idDossier: record.idDossier,
              },
            }}
          >
            <button className="btn autorisationButton"><BsPencilFill className="me-1"/> Notation</button>
          </Link>
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
      matricule: "19M254",
      name: "nom 1",
      dateEnvoi: "17-05-2022",
      dateNotation: "---",
      idDossier: "1",
    },
  ]);

  return (
    <>
      <div className=" mx-3 my-3" style={{ overflow: "scroll" }}>
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
    </>
  );
};

export default TableList;
