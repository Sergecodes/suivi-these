import React from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";


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
    title: <div>Score/100 </div>,
    dataIndex: "score",
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
       <Link to="/acteur/admin/detail-notation" state={{matricule:record.matricule}}> <p className="details pt-2">plus de details</p></Link>
       <Link to="/acteur/admin/rapport-soutenance" state={{matricule:record.matricule}}> <button className="btn autorisationButton">Autoriser</button></Link>
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

const Notation = () => {

  return (
    <div className=" mx-3 my-3">
        <h5 className="text-center my-4">Notes attribuées par les différents jurys</h5>
      <Table columns={columns} dataSource={data} align="center" pagination={{ pageSize: 5 }} />
      
    </div>
  );
};

export default Notation;
