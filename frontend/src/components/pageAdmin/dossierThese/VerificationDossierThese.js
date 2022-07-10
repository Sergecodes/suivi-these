import { useState } from "react";
//import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Modal } from "antd";
//import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PdfViewer from "../../common/PdfViewer";
import { ACTEURS } from "../../../constants/Constant";
import { BsEyeFill, BsX, BsCheck, BsArrowLeft } from "react-icons/bs";
import RejetDossier from "../../common/RejetDossier";
import { setRejectModal } from "../../redux/DashboardDisplaySlice";
import { useDispatch } from "react-redux";

const VerificationDossierThese = () => {
    const dispatch = useDispatch()
    const [fileUrl, setFileUrl] = useState({nom:"",url:""});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const location = useLocation();
    //const  navigate = useNavigate();
    //const user = JSON.parse(localStorage.getItem("user"));
    const { etudiantInfo } = location.state;
    const dossier = etudiantInfo.dossier;
    const listeFichiers = dossier.fichiers;
   // const { confirm } = Modal;
  
  
   /* const handleSubmit = () => {
      const idDossier = dossier.id;
  
      confirm({
        title: "Valider ce dossier?",
        icon: <AiOutlineExclamationCircle style={{ color: "gold" }} />,
        okText: "Oui",
        cancelText: "Non",
        async onOk() {
          console.log("user is ", user);
          // Send request to api (return promise to enable loading spinner near Ok button)
          return axios
            .put("/departements/valider-dossier", { idDossier })
            .then((res) => {
              console.log(res);
  
              // Now send dossier to admin
              axios
                .post("/envoyer-dossier", {
                  dossier: idDossier,
                  envoyePar: user.id,
                  envoyeParModel: ACTEURS.DEPARTEMENT,
                  destinataireModel: ACTEURS.ADMIN,
                })
                .then((res) => {
                  console.log(res);
                  toast.success("Succes!", { hideProgressBar: true });
  
                  setTimeout(() => {
                    toast.dismiss();
                    navigate("/acteur/departement/dashboard");
                  }, 3000);
                })
                .catch((err) => {
                  toast.error("Une erreur est survenue!", {
                    hideProgressBar: true,
                  });
                  console.error(err);
                });
            })
            .catch((err) => {
              console.error(err);
              toast.error("Une erreur est survenue!", { hideProgressBar: true });
            });
        },
        onCancel() {},
      });
    };*/
  
    return (
      <section className="mx-3 my-3 ">
        <ToastContainer />
        <Link to="/acteur/departement/dashboard">
          <div className="details fs-4">
            <BsArrowLeft className="me-1" />
            <span>Retour</span>
          </div>
        </Link>
        <h4 className="text-center mb-2">
          Liste des fichiers de l'étudiant {etudiantInfo.name} (
          {etudiantInfo.matricule})
        </h4>
        <div className="row">
          {listeFichiers.map((fichier) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={fichier.id}>
              <div
                className="mx-1 my-2 px-1 py-1"
                style={{
                  backgroundColor: "white",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                }}
              >
                <div
                  className="mx-1 my-1"
                  style={{ backgroundColor: "var(--secondaryColor)" }}
                >
                  <div className="pe-2 py-2">
                    <PdfViewer url={fichier.url} height="120px" />
                  </div>
                </div>
                <p className="fs-6 fw-bold ms-1 my-2">{fichier.categorie}</p>
                <button
                  type="button"
                  className="btn btnFull ms-1 mb-2"
                  onClick={() => {
                    setFileUrl({...fileUrl,nom:fichier.categorie,url:fichier.url});
                    setIsModalVisible(true);
                  }}
                >
                  <BsEyeFill className="me-1" /> Visualiser
                </button>
              </div>
            </div>
          ))}
        </div>
        <div >
          <Modal
            title={fileUrl.nom}
            visible={isModalVisible}
            onOk={() => {
              setIsModalVisible(false);
            }}
            onCancel={() => {
              setIsModalVisible(false);
            }}
            width="100vw"
            bodyStyle={{ height: "90vh", padding: 0, margin: 0 }}
            style={{ top: 0 }}
            footer={[
              <div key="close" className="d-flex justify-content-center my-2">
                <button
                  className="btn btnEmpty"
                  type="button"
                  onClick={() => {
                    setIsModalVisible(false);
                  }}
                >
                  FERMER
                </button>
              </div>,
            ]}
            destroyOnClose={true}
          >
            <PdfViewer url={fileUrl.url} height="100%" />
          </Modal>
        </div>
        <div className="d-flex justify-content-center" >
          <button
            className="btn rejectButton my-5 me-3 d-flex align-items-center"
            type="button"
            onClick={()=>{dispatch(setRejectModal({ choix: true }));}}
            disabled={etudiantInfo.dejaNote?true:false}
          >
            <BsX className="me-1 fs-4" /> REJETER
          </button>
          <RejetDossier etudiant={{idDossier:dossier.id,matricule:etudiantInfo.matricule,nom:etudiantInfo.name}} acteur={ACTEURS.DEPARTEMENT} />
          <button
            className="btn autorisationButton my-5 d-flex align-items-center"
            type="button"
            onClick={handleSubmit}
            disabled={etudiantInfo.dejaNote?true:false}
          >
            <BsCheck className=" fs-4" /> VALIDER
          </button>
        </div>
      </section>
    );
}

export default VerificationDossierThese



