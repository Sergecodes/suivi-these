import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";
import { sum } from '../../../utils';


const columns = [
  {
    title: <div>Matricule</div>,
    dataIndex: "matricule",
    sorter: {
      compare: (a, b) => a.matricule.localeCompare(b.matricule),
    },
    align: "center"
  },
  {
    title: <div>Nom et Prenom</div>,
    dataIndex: "name",
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
    },
    align: "center"
  },
  {
    title: <div>Actions</div>,
    render: (record) => {
      return (
        <div className="d-flex justify-content-around align-items-center ">
          <Link 
            to="/acteur/coordonateur/rapport-master" 
            state={{ etudiantInfo: { matricule: record.matricule, nom: record.name } }}
          > 
            <p className="details pt-2">
              <BsEyeFill className="me-2" /> Visualiser
            </p>
          </Link>
          <Link 
            to="/acteur/coordonateur/date" 
            state={{ etudiantInfo: { id: record.id, matricule: record.matricule, nom: record.name } }}
          > 
            <button className="btn autorisationButton">Autoriser</button>
          </Link>
        </div>
      );
    },
    align: "center"
  },
];

const AutorisationDeSoutenance = () => {
  const [data, setData] = useState([{
    key: "1",
    matricule: "",
    name: "Nom 1 prenom 1",
    score: 15
  }]);

  useEffect(() => {
    axios.get('/coordonateurs/autorisations-soutenances-master')
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
    for (let avis of resData) {
      let etud = avis.dossier.etudiant;

      result.push({
        key: avis.id,
        id: etud.id,
        matricule: etud.matricule,
        name: etud.nom + ' ' + etud.prenom,
        score: (function () {
          let result = [], maxTotal = 60;
          for (let noteObj of avis.dossier.notes) {
            // max for total is 60
            result.push(noteObj.total);
          }

          // y * n  gives the number by which we have to divide 
          // to get the average over 20.
          // y is the total mark divided by 20 & n is the number of marks 
          return sum(result) / ((maxTotal / 20) * result.length)
        })()
      })
    }

    return result;
  }

  return (
    <div className=" mx-3 my-3">
      <ToastContainer />
      <h5 className="text-center my-4">
        Rapports d'autorisation de soutenance des étudiants de master
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
