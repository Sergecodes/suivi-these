import { Table } from "antd";
import { useState, useEffect } from "react";
import axios from 'axios';
import moment from "moment";
import { toast, ToastContainer } from 'react-toastify'
import { BsPenFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ACTEURS } from '../../constants/Constant';


const TableListDepartement = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const [data, setData] = useState([{
    key: "1",
    photo: (
      <img
        src=""
        alt="profil"
        className="rounded-circle"
        style={{ width: "50px", height: "50px" }}
      />
    ),
    matricule: "",
    name: "",
    initDateEnvoi: '',
    dateEnvoi: '',
    initDateVerification: '',
    dateVerification: "---"
  }]);

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
          moment(a.initDateEnvoi).unix() - moment(b.initDateEnvoi).unix(),
      },
      align: "center",
    },
    {
      title: "Date Verification",
      dataIndex: "dateVerification",
      sorter: {
        compare: (a, b) =>
          moment(a.initDateVerification).unix() - moment(b.initDateVerification).unix(),
      },
      align: "center",
    },
    {
      title: "Actions",
      render: (record) => (
        <div className="d-flex fs-4 justify-content-around ">
          <Link to="/acteur/departement/verification"
            state={{
              etudiantInfo: {
                matricule: record.matricule,
                name: record.name,
                dossier: record.dossier
              }
            }}
          >
            <BsPenFill style={{ color: "#513e8f" }} />
          </Link>
        </div>
      ),
      align: "center",
    },
  ];


  useEffect(() => {
    Promise.all([
      axios.get(`/departements/dossiers-etudiants-master`),
      // To get the dateVerification, we need to get the dossiers sent to the admin
      // from the departement and retrieve the envoyeLe attribute.
      axios.get('/dossiers-envoyes', {
        envoyePar: user.id,
        envoyeParModel: ACTEURS.DEPARTEMENT,
        destinataireModel: ACTEURS.ADMIN
      })
    ])
      .then(results => {
        const [res1, res2] = results;
        console.log(res1);
        console.log(res2);
        setData(parseResult(res1.data, res2.data));
      })
      .catch(err => {
        console.error(err);
        toast.error("Une erreur est survenue!", { hideProgressBar: true });
      })
  }, []);

  const parseResult = (envois1Data, envois2Data) => {
    let result = [];
    for (let envoiObj of envois1Data) {
      let dossier = envoiObj.dossier;
      let etud = dossier.etudiant;
      let envoi2Obj = envois2Data.find(obj => obj.dossier.id === dossier.id);

      result.push({
        key: envoiObj.id,
        dossier,
        photo: (
          <img
            src={etud.urlPhotoProfil}
            alt="profil"
            className="rounded-circle"
            style={{ width: "50px", height: "50px" }}
          />
        ),
        matricule: etud.matricule,
        name: etud.nom + ' ' + etud.prenom,
        initDateEnvoi: envoiObj.envoyeLe,
        dateEnvoi: moment(envoiObj.envoyeLe).format('dddd, D MMMM YYYY'),
        initDateVerification: envoi2Obj.envoyeLe,
        dateVerification: envoi2Obj ? moment(envoi2Obj.envoyeLe).format('dddd, D MMM YYYY') : '---',
      });
    }

    return result;
  }

  return (
    <>
      <ToastContainer />
      <div className=" mx-3 my-3" style={{ overflow: "scroll" }}>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
      </div>
    </>
  );
};

export default TableListDepartement;
