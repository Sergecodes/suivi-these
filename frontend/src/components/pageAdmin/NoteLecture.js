import { useState, useEffect } from "react";
import { Table, Modal } from "antd";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from "react-router-dom";
import RejetEtudiant from "./RejetEtudiant";
import { useDispatch } from "react-redux";
import { setRejectModal } from "../../redux/DashboardDisplaySlice";
import { average } from '../../utils';


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
            <p
              className="details pt-2"
              onClick={() => {
                showModal();
                setEtudiant({ matricule: record.matricule, nom: record.name, score: record.score });
              }}
            >
              plus de details
            </p>
            <Link
              to="/acteur/admin/rapport-soutenance"
              state={{
                etudiantInfo: { 
                  matricule: record.matricule, 
                  nom: record.name, 
                  idDossier: record.idDossier 
                },
              }}
            >
              {" "}
              <button className="btn autorisationButton">Autoriser</button>
            </Link>
            <button
              className="btn rejectButton"
              onClick={() => {
                dispatch(setRejectModal({ choix: true }));
                setEtudiant({ matricule: record.matricule, nom: record.name });
              }}
            >
              Rejeter
            </button>
          </div>
        );
      },
      align: "center",
    },
  ];
  const [data, setData] = useState([
    {
      key: "1",
      idDossier: '',
      matricule: "",
      name: "Nom 1 prenom 1",
      firstJuryTotal: 0,
      secondJuryTotal: 0,
      thirdJuryTotal: 0,
      score: 0,
      marks: [{}, {}, {}]
    },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [etudiant, setEtudiant] = useState({});
  const [listeJury, setListeJury] = useState([
    "jury1@gmail.com", "jury2@gmail.com", "jury3@gmail.com"
  ]);

  useEffect(() => {
    axios.get('/notes-dossier')
      .then(res => {
        console.log(res);
        setData(parseResult(res.data));
        setListeJury((function () {
          let firstJuries = Object.values(res.data)[0].juges;
          return firstJuries.map(jury => jury.email);
        })());
      })
      .catch(err => {
        console.error(err);
        toast.error("Une erreur est survenue!", { hideProgressBar: true });
      });
  }, []);

  const parseResult = (resData) => {
    let result = [];
    for (const [idDossier, valObj] of Object.entries(resData)) {
      const etud = valObj.dossier.etudiant;
      const sommes = valObj.sommes;

      result.push({
        key: idDossier,
        idDossier,
        matricule: etud.matricule,
        name: etud.nom + ' ' + etud.prenom,
        firstJuryTotal: sommes[0] || '',
        secondJuryTotal: sommes[1] || '',
        thirdJuryTotal: sommes[2] || '',
        score: average(sommes).toFixed(2),
        marks: valObj.notes
      });
    }

    return result;
  }

  const getNotes = (idx, matEtud) => {
    return (data.find(obj => obj.matricule === matEtud)).marks[idx];
  }

  const showModal = () => setIsModalVisible(true);

  const handleCancel = () => setIsModalVisible(false);

  return (
    <>
      <ToastContainer />
      <section className="mx-3 my-3">
        <h5 className="text-center my-4">
          Notes attribuées par les différents juries
        </h5>
        <Table
          columns={columns}
          dataSource={data}
          align="center"
          pagination={{ pageSize: 5 }}
        />
        <RejetEtudiant etudiant={etudiant} />
        <Modal
          title="ListeJury"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <button type="button" className="btn btnEmpty" onClick={handleCancel}>
              Retour
            </button>,
          ]}
        >
          <div>
            <p className="fs-5 fw-light text-center">
              Veuillez selectionner le jury dont vous voulez avoir les détails sur
              sa notation
            </p>
            {listeJury.map((emailJury, idx) => {
              return (
                <div key={emailJury}>
                  <div className="d-flex justify-content-around align-items-center">
                    <p>{emailJury}</p>
                    <Link
                      to="/acteur/admin/detail-notation"
                      state={{
                        etudiantInfo: {
                          matricule: etudiant.matricule,
                          nom: etudiant.nom,
                          emailJury,
                          score: etudiant.score,
                        },
                        juryNotes: getNotes(idx, etudiant.matricule)
                      }}
                    >
                      {" "}
                      <p className="details">Voir les details</p>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Modal>
      </section>
    </>
  );
};

export default Notation;
