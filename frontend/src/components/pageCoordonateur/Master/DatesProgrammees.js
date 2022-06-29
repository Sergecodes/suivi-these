import React from "react";
import { Table } from "antd";


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
    title: <div>Soutient le</div>,
    dataIndex: "soutenance",
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
    },
    align:"center"
  }
];

const data = [
  {
    key:"1",
    matricule: "19M2216",
    name: "Nom 1 prenom 1",
    soutenance:"19/02/2022"
  },
  {
    key:"2",
    matricule: "19M2217",
    name: "Nom 2 prenom 2",
    soutenance:"22/03/2022"
  },
  {  
    key:"3",
    matricule: "19M2218",
    name: "Nom 3 prenom 3",
    soutenance:"25/05/2022"
  },
];

const AutorisationDeSoutenance = () => {

  return (
    <div className=" mx-3 my-3">
        <h5 className="text-center my-4">Liste des soutenances de master déjà programmées </h5>
      <Table columns={columns} dataSource={data} align="center" pagination={{ pageSize: 5 }} />
      
    </div>
  );
};

export default AutorisationDeSoutenance;
