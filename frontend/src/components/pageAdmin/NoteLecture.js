import { useState, useEffect } from "react";
import { Table, Modal } from "antd";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import RejetDossier from "./RejetDossier";
import { useDispatch } from "react-redux";
import { BsX, BsCheck } from "react-icons/bs";
import { setRejectModal } from "../../redux/DashboardDisplaySlice";
import { average } from "../../utils";
import { ACTEURS } from "../../constants/Constant";


const Notation = () => {
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
              <BsCheck className="mx-1 correct fs-2" />
            </Link>
            <BsX
              className="mx-1 wrong fs-2"
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => {
                dispatch(setRejectModal({ choix: true }));
                setEtudiant({ idDossier: record.idDossier,mmatricule: record.matricule, nom: record.name });
              }}
            />
          </div>
        );
      },
      align: "center",
    },
  ];
  const [data, setData] = useState([{
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
  }]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [etudiant, setEtudiant] = useState({});

  const [selectedJuries, setSelectedJuries] = useState([]);

  useEffect(() => {
    axios
      .get("/admin/notes-dossiers")
      .then((res) => {
        setData(parseResult(res.data));
      })
      .catch((err) => {
        console.error(err);
        toast.error("Une erreur est survenue!", { hideProgressBar: true });
      });
  }, []);

  const parseResult = (resData) => {
    let result = [];
    for (const [idDossier, valObj] of Object.entries(resData)) {
      const etud = valObj.dossierInfo.etudiant;
      const sommes = valObj.sommes;

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
