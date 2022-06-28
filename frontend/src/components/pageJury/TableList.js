import { Table } from "antd";
import React from "react";
import moment from "moment";
import { MdSend } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

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
        <div>
          <div style={record.dateNotation !== "---" ? { display: "none" } : {}}>
            <Link to="/acteur/jury/notation" state={{etudiantInfo:{matricule:record.matricule, nom:record.name}}}>
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
            <Link to="/acteur/jury/notation">
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
var today = new Date();

const data = [
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
    matricule: "19M2213",
    name: "Nom 1 Prenom 1",
    dateEnvoi: today.toLocaleString("en-US"),
    dateNotation: "---",
  },
  {
    key: "78",
    photo: (
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1nf1W7VULCSp751rP0AxpCPvOzoN9XKDO0Q&usqp=CAU"
        alt="cc"
        className="rounded-circle"
        style={{ width: "50px", height: "50px" }}
      />
    ),
    matricule: "19M2221",
    name: "Nom 2 Prenom 2",
    dateEnvoi: today.toLocaleString("en-US"),
    dateNotation: today.toLocaleString("en-US"),
  },
  {
    key: "2",
    photo: (
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1nf1W7VULCSp751rP0AxpCPvOzoN9XKDO0Q&usqp=CAU"
        alt="cc"
        className="rounded-circle"
        style={{ width: "50px", height: "50px" }}
      />
    ),
    matricule: "19M2222",
    name: "Nom 3 Prenom 3",
    dateEnvoi: today.toLocaleString("en-US"),
    dateNotation: "---",
  },
  {
    key: "3",
    photo: (
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1nf1W7VULCSp751rP0AxpCPvOzoN9XKDO0Q&usqp=CAU"
        alt="cc"
        className="rounded-circle"
        style={{ width: "50px", height: "50px" }}
      />
    ),
    matricule: "19M2223",
    name: "Nom 4 Prenom 4",
    dateEnvoi: today.toLocaleString("en-US"),
    dateNotation: "---",
  },
  {
    key: "4",
    photo: (
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1nf1W7VULCSp751rP0AxpCPvOzoN9XKDO0Q&usqp=CAU"
        alt="cc"
        className="rounded-circle"
        style={{ width: "50px", height: "50px" }}
      />
    ),
    matricule: "19M2224",
    name: "Nom 5 Prenom 5",
    dateEnvoi: today.toLocaleString("en-US"),
    dateNotation: today.toLocaleString("en-US"),
  }
];

/*function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}*/

const TableList = () => {
  return (
    <div className=" mx-3 my-3" style={{ overflow: "scroll" }}>
      <div style={{backgroundColor: "#2a1c5a",borderRadius:"10px" }}>
        <h5  className="text-center py-3" style={{color:"white"}}>
          LISTE DES DOSSIERS ETUDIANTS
        </h5>
      </div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default TableList;
