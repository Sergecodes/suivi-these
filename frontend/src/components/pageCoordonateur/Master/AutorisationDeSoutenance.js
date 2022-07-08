import { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';
import { toast, ToastContainer } from "react-toastify";
import { Table, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";
import { sum } from "../../../utils";
import { ACTEURS } from "../../../constants/Constant";

moment.locale('fr');


const columns = [
  {
    title: <div>Matricule</div>,
    dataIndex: "matricule",
    sorter: {
      compare: (a, b) => a.matricule.localeCompare(b.matricule),
    },
    align: "center",
  },
  {
    title: <div>Nom et Prenom</div>,
    dataIndex: "name",
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
    },
    align: "center",
  },
  {
    title: "Date de programmation",
    dataIndex: "dateProgrammation",
    sorter: {
      compare: (a, b) =>
        moment(a.initDateProgrammation).unix() -
        moment(b.initDateProgrammation).unix(),
    },
    align: "center",
  },
  {
    title: <div>Actions</div>,
    render: (record) => {
      return (
        <div className="d-flex justify-content-around align-items-center ">
          <Link
            to="/acteur/coordonateur/rapport-master"
            state={{
              etudiantInfo: {
                rapport: record.rapport,
                matricule: record.matricule,
                nom: record.name,
              },
            }}
          >
            <p className="details pt-2">
              <Tooltip
                placement="bottom"
                title="Visualiser le rapport du CRFD"
                arrowPointAtCenter
              >
                <BsEyeFill className="me-2" /> Visualiser
              </Tooltip>
            </p>
          </Link>
          <Link
            to="/acteur/coordonateur/date"
            state={{
              etudiantInfo: {
                id: record.id,
                idDossier: record.idDossier,
                matricule: record.matricule,
                nom: record.name,
              },
            }}
          >
            <Tooltip
              placement="bottom"
              title="Programmer la date de soutenance"
              arrowPointAtCenter
            >
              <button className="btn autorisationButton">Programmer</button>
            </Tooltip>
          </Link>
        </div>
      );
    },
    align: "center",
  },
];

const AutorisationDeSoutenance = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [data, setData] = useState([
    {
      key: "1",
      id: '1',
      idDossier: '',
      matricule: "",
      name: "Nom 1 prenom 1",
      rapport: "",
      score: 15,
      initDateProgrammation: 0,
      dateProgrammation: '---'
    },
  ]);

  useEffect(() => {
    Promise.all([
      axios.get("/coordonateurs/autorisations-soutenances-master"),
      axios.get("/avis-donnes", {
        params: {
          donnePar: user.id,
          donneParModel: ACTEURS.COORDONATEUR,
          destinataireModel: ACTEURS.ETUDIANT,
        },
      }),
    ])
      .then(results => {
        const [res1, res2] = results;
        console.log(res1);
        console.log(res2);
        setData(parseResult(res1.data, res2.data));
      })
      .catch((err) => {
        console.error(err);
        toast.error("Une erreur est survenue!", { hideProgressBar: true });
      });
  }, []);

  const parseResult = (res1Data, res2Data) => {
    let result = [];
    for (let avis of res1Data) {
      let etud = avis.dossier.etudiant;
      let avisProgramme = res2Data.find(avisObj => avisObj.dossier.id === avis.dossier.id);

      result.push({
        key: avis.id,
        id: etud.id,
        idDossier: avis.dossier.id,
        matricule: etud.matricule,
        name: etud.nom + " " + etud.prenom,
        rapport: avis.rapport,
        initDateProgrammation: avisProgramme ? avisProgramme.donneLe : 0,
        dateProgrammation: avisProgramme
          ? moment(avisProgramme.donneLe).format("dddd, D MMM YYYY")
          : "---",
        score: (function () {
          let result = [],
            maxTotal = 60;
          for (let noteObj of avis.dossier.notes) {
            // max for total is 60
            result.push(noteObj.total);
          }

          // y * n  gives the number by which we have to divide
          // to get the average over 20.
          // y is the total mark divided by 20 & n is the number of marks
          return sum(result) / ((maxTotal / 20) * result.length);
        })(),
      });
    }

    return result;
  };

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
