import { Table } from "antd";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import moment from "moment";


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
      compare: (a, b) => a.email.localeCompare(b.email),
    },
  },
  {
    title: <div className="text-center">Unite de recherche</div>,
    dataIndex: "uniteRecherche",
    sorter: {
      compare: (a, b) => a.uniteRecherche.localeCompare(b.uniteRecherche),
    },
  },
  {
    title: <div className="text-center">Date de validation</div>,
    dataIndex: "dateValidation",
    sorter: {
      compare: (a, b) => moment(a.initDateValidation).unix() - moment(b.initDateValidation).unix(),
    },
  },
];

const ListeEtudiantsMaster = () => {
  const [data, setData] = useState([{
    key: "1",
    matricule: "19M2216",
    name: "Nom 1 prenom 1",
    uniteRecherche: "MIBA",
    email: "admin@gmail.com",
    initDateValidation: '',
    dateValidation: '',
  }]);

  useEffect(() => {
    axios.get('/etudiants/master')
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
        uniteRecherche: etud.departement.uniteRecherche.code,
        email: etud.email,
        initDateValidation: etud.compteValideLe,
        dateValidation: moment(etud.compteValideLe).format('dddd, D MMMM YYYY'),
      });
    }

    return result;
  }

  return (
    <div className=" mx-3 my-3">
      <ToastContainer />
      <div className="tableTitleDisplay">
        <h5>MASTER</h5>
        <p>Liste des étudiants en master</p>
      </div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
    </div>
  );
};

export default ListeEtudiantsMaster;
