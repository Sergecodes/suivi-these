import React from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import {BsEyeFill} from "react-icons/bs"


const columns = [
  {
    title: <div>Matricule</div>,
    dataIndex: "matricule",
    sorter: {
      compare: (a, b) => a.matricule.localeCompare(b.matricule),
    },
    align:"center"
  },
  {
    title: <div>Nom et Prenom</div>,
    dataIndex: "name",
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
    },
    align:"center"
  },
  {
    title:<div>Actions</div>,
    render:(record) => {
      return (
        <div className="d-flex justify-content-around align-items-center ">
       <Link to="/acteur/coordonateur/dossier-these" state={{etudiantInfo:{matricule:record.matricule, nom:record.name}}}> <p className="details pt-2"><BsEyeFill className="me-2"/> Visualiser</p></Link>
       <Link to="/acteur/coordonateur/redaction-rapport" state={{etudiantInfo:{matricule:record.matricule, nom:record.name}}}> <button className="btn autorisationButton">Rapport</button></Link>
        </div>
      );
    },
    align:"center"
  },
];

const data = [
  {
    key:"1",
    matricule: "19M2216",
    name: "Nom 1 prenom 1",
    score:15
  },
  {
    key:"2",
    matricule: "19M2217",
    name: "Nom 2 prenom 2",
    score:75
  },
  {  
    key:"3",
    matricule: "19M2218",
    name: "Nom 3 prenom 3",
    score:80
  },
];

const RapportAudition = () => {

  return (
    <div className=" mx-3 my-3">
        <h5 className="text-center my-4">Liste des dossiers des étudiants de thèse</h5>
      <Table columns={columns} dataSource={data} align="center" pagination={{ pageSize: 5 }} />
      
    </div>
  );
};

export default RapportAudition;
