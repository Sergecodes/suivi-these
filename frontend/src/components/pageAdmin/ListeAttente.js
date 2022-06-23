import { Table } from "antd";
import React from "react";
import moment from "moment";
import { BsCheck, BsX } from "react-icons/bs";

const columns = [
  {
    title: <div className="text-center">Matricule</div>,
    dataIndex: "matricule",
    sorter: {
      compare: (a, b) => a.matricule.localeCompare(b.matricule),
    },
  },
  {
    title: <div className="text-center">Nom et Prenom</div>,
    dataIndex: "name",
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
    },
  },
  {
    title: <div className="text-center">Email</div>,
    dataIndex: "email",
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
    },
  },
  {
    title: <div className="text-center">Unite de recherche</div>,
    dataIndex: "uniteRecherche",
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
    },
  },
  {
    title: <div className="text-center">Niveau</div>,
    dataIndex: "niveau",
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
    },
  },
  {
    title: <div className="text-center">Date de creation</div>,
    dataIndex: "dateCreation",
    sorter: {
      compare: (a, b) =>
        moment(a.dateCreation).unix() - moment(b.dateCreation).unix(),
    },
  },
  {
    title:"Actions",
    render:(record) => {
      return (
        <div className="d-flex fs-3 justify-content-center ">
          <BsCheck className="mx-1 correct" onClick={()=>{alert('vous voulez confirmer la demande de '+record.matricule)}} style={{ color: "green" }} />
          <BsX className="mx-1 wrong" onClick={()=>{alert('vous voulez annuler la demande de '+record.matricule)}} style={{ color: "red" }} />
        </div>
      );
    },
  },
];
var today = new Date();

const data = [
  {
    key:"1",
    matricule: "19M2216",
    name: "Nom 1 prenom 1",
    uniteRecherche: "MIBA",
    email: "admin@gmail.com",
    niveau: "master",
    dateCreation: today.toLocaleString("en-US"),
  },
  {
    key:"2",
    matricule: "19M2217",
    name: "Nom 1 prenom 1",
    uniteRecherche: "MIBA",
    email: "admin@gmail.com",
    niveau: "master",
    dateCreation: today.toLocaleString("en-US"),
  },
  {
    key:"3",
    matricule: "19M2218",
    name: "Nom 1 prenom 1",
    uniteRecherche: "MIBA",
    email: "admin@gmail.com",
    niveau: "master",
    dateCreation: today.toLocaleString("en-US"),
  },
];

const ListeAttente = () => {
  return (
    <div className=" mx-3 my-3">
      <div className="tableTitleDisplay">
        <h5>ATTENTE</h5>
        <p>
          Liste des étudiants en attente de validation de leurs demandes
          d'inscription
        </p>
      </div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default ListeAttente;
