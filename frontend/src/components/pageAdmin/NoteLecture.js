import { useState, useEffect } from "react";
import { Table, Modal, Tooltip } from "antd";
import axios from "axios";
import moment from 'moment';
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import RejetDossier from "../common/RejetDossier";
import { useDispatch } from "react-redux";
import { BsX, BsCheck } from "react-icons/bs";
import { setRejectModal } from "../../redux/DashboardDisplaySlice";
import { average } from "../../utils";
import { ACTEURS } from "../../constants/Constant";

moment.locale('fr');


const Notation = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
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
      title: <div>Note jury 1</div>,
      dataIndex: "firstJuryTotal",
      sorter: {
        compare: (a, b) => a.firstJuryTotal.localeCompare(b.firstJuryTotal),
      },
      align: "center",
    },
    {
      title: <div>Note jury 2</div>,
      dataIndex: "secondJuryTotal",
      sorter: {
        compare: (a, b) => a.secondJuryTotal.localeCompare(b.secondJuryTotal),
      },
      align: "center",
    },
    {
      title: <div>Note jury 3</div>,
      dataIndex: "thirdJuryTotal",
      sorter: {
        compare: (a, b) => a.thirdJuryTotal.localeCompare(b.thirdJuryTotal),
      },
      align: "center",
    },
    {
      title: <div>Moyenne/60 </div>,
      dataIndex: "score",
      sorter: {
        compare: (a, b) => a.score.localeCompare(b.score),
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
      title: <div>Actions</div>,
      render: (record) => {
        return (
          <div className="d-flex justify-content-between align-items-center ">
            <p className="details pt-3" onClick={() => handleDetails(record)}>
              Détails
            </p>
            <Link
              to="/acteur/admin/rapport-soutenance"
              style={{ color: "green", cursor: "pointer" }}
              state={{
                etudiantInfo: {
                  matricule: record.matricule,
                  nom: record.name,
                  idDossier: record.idDossier,
                },
              }}
            >
              {" "}
              <Tooltip
                placement="bottom"
                title="Rediger rapport de soutenance"
                arrowPointAtCenter
              >
                <BsCheck className="mx-1 correct fs-2" />
              </Tooltip>
            </Link>
            <Tooltip
              placement="bottom"
              title="Rejeter dossier"
              arrowPointAtCenter
            >
              <BsX
                className="mx-1 wrong fs-2"
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => {
                  dispatch(setRejectModal({ choix: true }));
                  setEtudiant({
                    idDossier: record.idDossier,
                    matricule: record.matricule,
                    nom: record.name,
                  });
                }}
              />
            </Tooltip>
          </div>
        );
      },
      align: "center",
    },
  ];
  const [data, setData] = useState([
    {
      key: "1",
      matricule: "",
      name: "Nom 1 prenom 1",
      juges: [],
      idDossier: "",
      firstJuryTotal: 0,
      secondJuryTotal: 0,
      thirdJuryTotal: 0,
      score: 0,
      marks: [{}, {}, {}],
      initDateVerification: 0,
      dateVerification: '---'
    },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [etudiant, setEtudiant] = useState({});
  const [selectedJuries, setSelectedJuries] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get("/admin/notes-dossiers"),
      axios.get("/avis-donnes", {
        params: {
          donnePar: user.id,
          donneParModel: ACTEURS.ADMIN,
          destinataireModel: ACTEURS.COORDONATEUR,
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
    for (const [idDossier, valObj] of Object.entries(res1Data)) {
      const etud = valObj.dossierInfo.etudiant;
      const sommes = valObj.sommes;
      const avisObj = res2Data.find(avis => avis.dossier.id === idDossier);

      result.push({
        key: idDossier,
        idDossier,
        matricule: etud.matricule,
        name: etud.nom + " " + etud.prenom,
        juges: valObj.juges,
        firstJuryTotal: sommes[0] || "",
        secondJuryTotal: sommes[1] || "",
        thirdJuryTotal: sommes[2] || "",
        score: average(sommes).toFixed(2),
        marks: valObj.notes,
        initDateVerification: avisObj ? avisObj.donneLe : 0,
        dateVerification: avisObj
          ? moment(avisObj.donneLe).format("dddd, D MMM YYYY")
          : "---",
      });
    }

    return result;
  };

  const showModal = () => setIsModalVisible(true);

  const handleCancel = () => setIsModalVisible(false);

  const handleDetails = (record) => {
    showModal();
    setEtudiant({
      matricule: record.matricule,
      nom: record.name,
      score: record.score,
    });

    let newSelectedJuries = [];
    let i = 0;
    for (let juge of record.juges) {
      newSelectedJuries.push({
        nomJury: juge.nom,
        prenomJury: juge.prenom,
        emailJury: juge.email,
        notes: record.marks[i],
      });
      i += 1;
    }
    setSelectedJuries(newSelectedJuries);
  };

  return (
    <>
      <ToastContainer />
      <section className="mx-3 my-3">
        <h5 className="text-center my-4">
          Notes attribuées par les différents jurys
        </h5>
        <Table
          columns={columns}
          dataSource={data}
          align="center"
          pagination={{ pageSize: 5 }}
        />
        <RejetDossier etudiant={etudiant} acteur={ACTEURS.ADMIN} />
        <Modal
          title="ListeJury"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <button
              type="button"
              className="btn btnEmpty"
              onClick={handleCancel}
            >
              Retour
            </button>,
          ]}
        >
          <div>
            <p className="fs-5 fw-light text-center">
              Veuillez selectionner le jury dont vous voulez avoir les détails
              sur sa notation
            </p>
            {selectedJuries.map((jury, idx) => (
              <div key={idx}>
                <div className="d-flex justify-content-around align-items-center">
                  <p>{jury.emailJury}</p>
                  <Link
                    to="/acteur/admin/detail-notation"
                    state={{
                      etudiantInfo: {
                        matricule: etudiant.matricule,
                        nom: etudiant.nom,
                        jury: jury,
                      },
                    }}
                  >
                    {" "}
                    <p className="details">Voir les details</p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      </section>
    </>
  );
};

export default Notation;
