import { Table, Modal } from "antd";
import axios from 'axios';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import moment from "moment";
import { BsCheck, BsX } from "react-icons/bs";

const { confirm } = Modal;


const ListeAttente = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([{
    key: "1",
    id: "1",
    matricule: "",
    name: "Nom 1 prenom 1",
    uniteRecherche: "MIBA",
    email: "",
    niveau: "",
    initDateCreation: '',
    dateCreation: '',
  }]);

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
      title: <div className="text-center">Niveau</div>,
      dataIndex: "niveau",
      sorter: {
        compare: (a, b) => a.niveau.localeCompare(b.niveau),
      },
    },
    {
      title: <div className="text-center">Date de creation</div>,
      dataIndex: "dateCreation",
      sorter: {
        compare: (a, b) =>
          moment(a.initDateCreation).unix() - moment(b.initDateCreation).unix(),
      },
    },
    {
      title: "Actions",
      render: (record) => (
        <div className="d-flex fs-3 justify-content-center ">
          <BsCheck
            className="mx-1 correct"
            onClick={(e) => handleConfirm(e, record)}
            style={{ color: "green" }}
          />
          <BsX
            className="mx-1 wrong"
            onClick={(e) => handleCancel(e, record)}
            style={{ color: "red" }}
          />
        </div>
      )
    },
  ];

  useEffect(() => {
    axios.get('/admin/demandes-inscription')
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
        id: etud.id,
        matricule: etud.matricule,
        name: etud.nom + ' ' + etud.prenom,
        uniteRecherche: etud.departement.uniteRecherche.code,
        email: etud.email,
        niveau: etud.niveau,
        initDateCreation: etud.creeLe,
        dateCreation: moment(etud.creeLe).format('dddd, D MMMM YYYY'),
      });
    }

    return result;
  }

  const handleConfirm = (e, etudiant) => {
    console.log(etudiant);

    confirm({
      title: "Voulez-vouz valider la demande d'inscription de cet etudiant?",
      content: <span className="fw-bold">{etudiant.name} ({ etudiant.matricule })</span>,
      icon: <AiOutlineExclamationCircle style={{ color: '#F2AD16', fontWeight: 900 }} />,
      okText: 'Oui',
      cancelText: 'Non',
      async onOk() {
        return axios.put(`/admin/etudiants/${etudiant.id}/accepter-inscription`)
          .then(res => {
            console.log(res);
            toast.success("Succes!", { hideProgressBar: true });

            setTimeout(() => {
              toast.dismiss();
              navigate(0);
            }, 3000);
          })
          .catch(err => {
            console.error(err);
            toast.error("Une erreur est survenue!", { hideProgressBar: true });
          });
      },
      onCancel() {

      }
    });
  }

  const handleCancel = (e, etudiant) => {
    confirm({
      title: "Voulez-vouz refuser la demande d'inscription de cet etudiant?",
      content: <span className="fw-bold">{etudiant.name} ({ etudiant.matricule })</span>,
      icon: <AiOutlineExclamationCircle style={{ color: '#F2AD16' }} />,
      okText: 'Oui',
      okType: 'danger',
      cancelText: 'Non',
      async onOk() {
        return axios.put(`/admin/etudiants/${etudiant.id}/rejeter-inscription`)
          .then(res => {
            console.log(res);
            toast.success("Succes!", { hideProgressBar: true });

            setTimeout(() => {
              toast.dismiss();
              navigate(0);
            }, 3000);
          })
          .catch(err => {
            console.error(err);
            toast.error("Une erreur est survenue!", { hideProgressBar: true });
          });
      },
      onCancel() {

      }
    });
  }

  return (
    <div className=" mx-3 my-3">
      <ToastContainer />
      <div className="tableTitleDisplay">
        <h5>ATTENTE</h5>
        <p>
          Liste des étudiants en attente de validation de leurs demandes
          d'inscription
        </p>
      </div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
    </div>
  );
};

export default ListeAttente;
