import { Table, Tooltip } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import { BsPenFill, BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ACTEURS } from "../../constants/Constant";

const TableListDepartement = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [data, setData] = useState([
    {
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
      initDateEnvoi: "",
      dateEnvoi: "",
      initDateVerification: 0,
      dateVerification: "---",
    },
  ]);

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
          moment(a.initDateVerification).unix() -
          moment(b.initDateVerification).unix(),
      },
      align: "center",
    },
    {
      title: "Actions",
      render: (record) => (
        <div className="d-flex fs-4 justify-content-around ">
          <div
            style={
              record.dateVerification !== "---"
                ? { display: "none" }
                : { margin: 0 }
            }
          >
            <Link
              to="/acteur/departement/verification"
              state={{
                etudiantInfo: {
                  matricule: record.matricule,
                  name: record.name,
                  dossier: record.dossier,
                  dejaNote: false,
                },
              }}
            >
               <Tooltip
                placement="bottom"
                title="Noter le dossier"
                arrowPointAtCenter
              >
                 <BsPenFill style={{ color: "#513e8f", cursor: "pointer" }} />
              </Tooltip>
             
            </Link>
          </div>
          <div
            style={
              record.dateVerification !== "---"
                ? { margin: 0 }
                : { display: "none" }
            }
          >
            <Link
              to="/acteur/departement/verification"
              state={{
                etudiantInfo: {
                  matricule: record.matricule,
                  name: record.name,
                  dossier: record.dossier,
                  dejaNote: true,
                },
              }}
            >
              <Tooltip
                placement="bottom"
                title="Visualiser le dossier"
                arrowPointAtCenter
              >
                <BsEyeFill
                  className="details"
                  style={{ color: "#513e8f", cursor: "pointer" }}
                />
              </Tooltip>
            </Link>
          </div>
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
      // NOTE: use params instead of body since axios supports body only with put, post, patch, delete requests
      axios.get("/dossiers-envoyes", {
        params: {
          envoyePar: user.id,
          envoyeParModel: ACTEURS.DEPARTEMENT,
          destinataireModel: ACTEURS.ADMIN,
        },
      }),
    ])
      .then((results) => {
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

  const parseResult = (envois1Data, envois2Data) => {
    let result = [];
    for (let envoiObj of envois1Data) {
      let dossier = envoiObj.dossier;
      let etud = dossier.etudiant;
      let envoi2Obj = envois2Data.find((obj) => obj.dossier.id === dossier.id);

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
        name: etud.nom + " " + etud.prenom,
        initDateEnvoi: envoiObj.envoyeLe,
        dateEnvoi: moment(envoiObj.envoyeLe).format("dddd, D MMMM YYYY"),
        initDateVerification: envoi2Obj ? envoi2Obj.envoyeLe : 0,
        dateVerification: envoi2Obj
          ? moment(envoi2Obj.envoyeLe).format("dddd, D MMM YYYY")
          : "---",
      });
    }

    return result;
  };

  return (
    <section>
      <ToastContainer />
      <div className=" mx-3 my-3" >
        <div style={{ backgroundColor: "#2a1c5a", borderRadius: "10px" }}>
          <h5 className="text-center py-3" style={{ color: "white" }}>
            LISTE DES DOSSIERS ETUDIANTS
          </h5>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </section>
  );
};

export default TableListDepartement;
