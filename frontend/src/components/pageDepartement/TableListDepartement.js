import { Table } from "antd";
import React from "react";
import moment from "moment";
import {MdSend} from "react-icons/md"

import {ImCross, ImCheckmark} from "react-icons/im";
import { Link } from "react-router-dom";


const columns = [
  {
    title: "Photo ",
    dataIndex: "photo",
  },
  {
    title: "Matricule",
    dataIndex: "matricule",
    sorter: {
      compare: (a, b) => a.matricule.localeCompare(b.matricule),
    },
  },
  {
    title: "Nom et Prenom",
    dataIndex: "name",
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
    },
  },
  {
    title: "Date Envoi",
    dataIndex: "dateEnvoi",
    sorter: {
      compare: (a, b) =>
        moment(a.dateEnvoi).unix() - moment(b.dateEnvoi).unix(),
    },
  },
  {
    title: "Date Notation",
    dataIndex: "dateNotation",
    sorter: {
      compare: (a, b) =>
        moment(a.dateEnvoi).unix() - moment(b.dateEnvoi).unix(),
    },
  },
  {
    title: "Statut",
    dataIndex: "statut",
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
    matricule: <div>19M2214</div>,
    name: <div className="fs-6 fw-light">Nchouwet Mfouapon Kuntz Stephane</div>,
    dateEnvoi: today.toLocaleString("en-US"),
    dateNotation: '---',
    statut: (
      <div>
        <Link to="/acteur/departement/verification">
          <button
            type="button"
            className="btn py-1"
            style={{
              color: "white",
              cursor: "pointer",
              backgroundColor: "var(--secondaryColor)",
            }}
          >
            <MdSend/> Consulter
          </button>
        </Link>
      </div>
    ),
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
    matricule: <div>19M2214</div>,
    name: <div className="fs-6 fw-light">Nchouwet Mfouapon Kuntz Stephane</div>,
    dateEnvoi: today.toLocaleString("en-US"),
    dateNotation: today.toLocaleString("en-US"),
    statut:<Link to="/acteur/departement/verification">
    <button
      type="button"
      className="btn py-1"
      style={{
        color: "green",
        cursor: "pointer",
        backgroundColor: "transparent",
      }}
    >
      <ImCheckmark /> Validé
    </button>
  </Link>,
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
    matricule: <div>19M2214</div>,
    name: <div className="fs-6 fw-light">Nchouwet Mfouapon Kuntz Stephane</div>,
    dateEnvoi: today.toLocaleString("en-US"),
    dateNotation: '---',
    statut:<div>
    <Link to="/acteur/departement/verification">
      <button
        type="button"
        className="btn py-1"
        style={{
          color: "white",
          cursor: "pointer",
          backgroundColor: "var(--secondaryColor)",
        }}
      >
        <MdSend/> Consulter
      </button>
    </Link>
  </div>,
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
    matricule: <div>19M2214</div>,
    name: <div className="fs-6 fw-light">Nchouwet Mfouapon Kuntz Stephane</div>,
    dateEnvoi: today.toLocaleString("en-US"),
    dateNotation: '---',
    statut: <div>
    <Link to="/acteur/departement/verification">
      <button
        type="button"
        className="btn py-1"
        style={{
          color: "white",
          cursor: "pointer",
          backgroundColor: "var(--secondaryColor)",
        }}
      >
        <MdSend/> Consulter
      </button>
    </Link>
  </div>,
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
    matricule: <div>19M2214</div>,
    name: <div className="fs-6 fw-light">Nchouwet Mfouapon Kuntz Stephane</div>,
    dateEnvoi: today.toLocaleString("en-US"),
    dateNotation: today.toLocaleString("en-US"),
    statut: <Link to="/acteur/departement/verification">
    <button
      type="button"
      className="btn py-1"
      style={{
        color: "red",
        cursor: "pointer",
        backgroundColor: "transparent",
      }}
    >
      <ImCross /> Rejeté
    </button>
  </Link>,
  },
  {
    key: "5",
    photo: (
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1nf1W7VULCSp751rP0AxpCPvOzoN9XKDO0Q&usqp=CAU"
        alt="cc"
        className="rounded-circle"
        style={{ width: "50px", height: "50px" }}
      />
    ),
    matricule: <div>19M2214</div>,
    name: <div className="fs-6 fw-light">Nchouwet Mfouapon Kuntz Stephane</div>,
    dateEnvoi: today.toLocaleString("en-US"),
    dateNotation: today.toLocaleString("en-US"),
    statut: <Link to="/acteur/departement/verification">
    <button
      type="button"
      className="btn py-1"
      style={{
        color: "red",
        cursor: "pointer",
        backgroundColor: "transparent",
      }}
    >
      <ImCross /> Rejeté
    </button>
  </Link>,
  },
  {
    key: "6",
    photo: (
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1nf1W7VULCSp751rP0AxpCPvOzoN9XKDO0Q&usqp=CAU"
        alt="cc"
        className="rounded-circle"
        style={{ width: "50px", height: "50px" }}
      />
    ),
    matricule: <div>19M2214</div>,
    name: <div className="fs-6 fw-light">Nchouwet Mfouapon Kuntz Stephane</div>,
    dateEnvoi: today.toLocaleString("en-US"),
    dateNotation: '---',
    statut: <div>
    <Link to="/acteur/departement/verification">
      <button
        type="button"
        className="btn py-1"
        style={{
          color: "white",
          cursor: "pointer",
          backgroundColor: "var(--secondaryColor)",
        }}
      >
        <MdSend/> Consulter
      </button>
    </Link>
  </div>,
  },
  {
    key: "7",
    photo: (
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1nf1W7VULCSp751rP0AxpCPvOzoN9XKDO0Q&usqp=CAU"
        alt="cc"
        className="rounded-circle"
        style={{ width: "50px", height: "50px" }}
      />
    ),
    matricule: <div>19M2214</div>,
    name: <div className="fs-6 fw-light">Nchouwet Mfouapon Kuntz Stephane</div>,
    dateEnvoi: today.toLocaleString("en-US"),
    dateNotation: today.toLocaleString("en-US"),
    statut: <Link to="/acteur/departement/verification">
    <button
      type="button"
      className="btn py-1"
      style={{
        color: "green",
        cursor: "pointer",
        backgroundColor: "transparent",
      }}
    >
      <ImCheckmark /> Validé
    </button>
  </Link>,
  },
  {
    key: "8",
    photo: (
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1nf1W7VULCSp751rP0AxpCPvOzoN9XKDO0Q&usqp=CAU"
        alt="cc"
        className="rounded-circle"
        style={{ width: "50px", height: "50px" }}
      />
    ),
    matricule: <div>19M2214</div>,
    name: <div className="fs-6 fw-light">Nchouwet Mfouapon Kuntz Stephane</div>,
    dateEnvoi: today.toLocaleString("en-US"),
    dateNotation: today.toLocaleString("en-US"),
    statut: <Link to="/acteur/departement/verification">
    <button
      type="button"
      className="btn py-1"
      style={{
        color: "green",
        cursor: "pointer",
        backgroundColor: "transparent",
      }}
    >
      <ImCheckmark /> Validé
    </button>
  </Link>,
  },
  {
    key: "9",
    photo: (
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1nf1W7VULCSp751rP0AxpCPvOzoN9XKDO0Q&usqp=CAU"
        alt="cc"
        className="rounded-circle"
        style={{ width: "50px", height: "50px" }}
      />
    ),
    matricule: <div>19M2214</div>,
    name: <div className="fs-6 fw-light">Nchouwet Mfouapon Kuntz Stephane</div>,
    dateEnvoi: today.toLocaleString("en-US"),
    dateNotation: today.toLocaleString("en-US"),
    statut: <Link to="/acteur/departement/verification">
    <button
      type="button"
      className="btn py-1"
      style={{
        color: "red",
        cursor: "pointer",
        backgroundColor: "transparent",
      }}
    >
      <ImCross /> Rejeté
    </button>
  </Link>,
  },
];

/*function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}*/

const TableListDepartement = () => {
  return (
    <div className=" mx-3 my-3" style={{overflow:"scroll"}}>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default TableListDepartement;
