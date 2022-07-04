import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Modal } from 'antd';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import PdfViewer from "../common/PdfViewer";
import { ACTEURS } from '../../constants/Constant';
const pdf = require("../../assets/images/image-pdf.jpg");

const { confirm } = Modal;


const VerificationMaster = () => {
  const location = useLocation(), navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const { etudiantInfo } = location.state;
  console.log(etudiantInfo);
  const dossier = etudiantInfo.dossier;
  const listeFichiers = dossier.fichiers;
  const [fileUrl, setFileUrl] = useState(listeFichiers[0].url);

  const handleFileSelect = (e, file) => {
    setFileUrl(file.url);
  }

  const handleSubmit = () => {
    const idDossier = dossier.id;

    confirm({
      title: "Valider ce dossier?",
      icon: <AiOutlineExclamationCircle style={{ color: 'gold' }} />,
      okText: 'Oui',
      cancelText: 'Non',
      async onOk() {
        // Send request to api (return promise to enable loading spinner near Ok button)
        return axios.post('/departements/valider-dossier', { idDossier })
          .then(res => {
            console.log(res);

            // Now send dossier to admin
            axios.post('/envoyer-dossier', {
              dossier: idDossier,
              envoyePar: user.id,
              envoyeParModel: ACTEURS.DEPARTEMENT,
              destinataireModel: ACTEURS.ADMIN
            })
              .then(res => {
                console.log(res);
                toast.success("Succes!", { hideProgressBar: true });

                setTimeout(() => {
                  toast.dismiss();
                  navigate('/acteur/departement/dashboard');
                }, 3000);
              })
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
    <section className="mx-3 my-3">
      <ToastContainer />

      <h4 className="text-center mb-2">
        Liste des fichiers de l'étudiant {etudiantInfo.name} ({etudiantInfo.matricule})
      </h4>
      <div className="row">
        {listeFichiers.map(fichier => (
          <div className="col-3" key={fichier.id}>
            <div className="mx-2 my-2" style={{ border: "1px solid gray" }}>
              <img 
                src={pdf} 
                alt="pdf placeholder" 
                style={{ width: "100%", height: "80px" }} 
                onClick={(e) => handleFileSelect(e, fichier)}
              />
              <p className="fs-6 text-center fw-bold">{fichier.categorie}</p>
            </div>
          </div>
        ))}
      </div>
      <PdfViewer url={fileUrl} />
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary my-5" type="button" onClick={handleSubmit}>
          VALIDER 
        </button>
      </div>
    </section>
  )
}

export default VerificationMaster