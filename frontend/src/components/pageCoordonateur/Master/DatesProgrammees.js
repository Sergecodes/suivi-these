import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
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
      compare: (a, b) => a.soutenance.localeCompare(b.soutenance),
    },
    align:"center"
  }
];


const AutorisationDeSoutenance = () => {
  const [data, setData] = useState([{
    key: "1",
    matricule: "",
    name: "Nom 1 prenom 1",
    soutenance: ""
  }]);

  useEffect(() => {
    axios.get('/coordonateurs/etudiants-masters-programmmes')
      .then(res => {
        console.log(res);
        setData(parseResult(res.data));
      })
      .catch(err => {
        console.error(err);
        toast.error("Une erreur est survenue!", { hideProgressBar: true });
      });
  }, []);

  const parseResult = (resData) => {
    let result = [];
    for (let etud of resData) {
      result.push({
        key: etud.id,
        matricule: etud.matricule,
        name: etud.nom + ' ' + etud.prenom,
        soutenance: etud.dateSoutenance
      })
    }

    return result;
  }

  return (
    <div className="mx-3 my-3">
      <ToastContainer />
      <h5 className="text-center my-4">
        Liste des soutenances de master déjà programmées 
      </h5>
      <Table 
        columns={columns} 
        dataSource={data} 
        align="center" 
        pagination={{ pageSize: 5 }} 
      />
    </div>
  );
};

export default AutorisationDeSoutenance;
