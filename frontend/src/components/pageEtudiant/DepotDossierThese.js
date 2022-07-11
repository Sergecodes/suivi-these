import { useState, useEffect } from "react";
import { Steps, Button, Result } from "antd";
import FirstStep from "./EtapesThese/FirstStep";
import SecondStep from "./EtapesThese/SecondStep";
import ThirdStep from "./EtapesThese/ThirdStep";
import FourthStep from "./EtapesThese/FourthStep";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { CategorieFichierThese, ACTEURS } from "../../constants/Constant";
import { useNavigate } from "react-router-dom";

const { Step } = Steps;

const DepotDossierMaster = () => {
  const [current, setCurrent] = useState(0);
  const [canUpload, setCanUpload] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();
  const files = useSelector((state) => state.theseFilesUpload);
  const dataInfo = useSelector((state) => state.dataStorage);
  const user = JSON.parse(localStorage.getItem("user"));

  // Verifier si l'etudiant peut uploader
  useEffect(() => {
    let peutUploader = localStorage.getItem('peutUploader');
    
    if (peutUploader === "false") {
      setCanUpload(false);
      console.log("Cet etudiant ne peux pas/plus uploader");
    } else {
      axios
        .get("/etudiants/peut-uploader")
        .then((res) => {
          console.log(res);
          peutUploader = res.data.peutUploader;
          setCanUpload(peutUploader);

          // Store in localStorage only when he can no longer upload.
          if (peutUploader === false) {
            localStorage.setItem('peutUploader', false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  const steps = [
    {
      title: (
        <p style={current === 0 ? { color: "var(--primaryColor)" } : {}}>
          Etape 1
        </p>
      ),
      content: <FirstStep />,
    },
    {
      title: (
        <p style={current === 1 ? { color: "var(--primaryColor)" } : {}}>
          Etape 2
        </p>
      ),
      content: <SecondStep />,
    },
    {
      title: (
        <p style={current === 2 ? { color: "var(--primaryColor)" } : {}}>
          Etape 3
        </p>
      ),
      content: <ThirdStep />,
    },
    {
      title: (
        <p style={current === 3 ? { color: "var(--primaryColor)" } : {}}>
          Etape 4
        </p>
      ),
      content: <FourthStep />,
    },
  ];

  const next = () => setCurrent(current + 1);

  const prev = () => setCurrent(current - 1);

  function verification() {
    let verify = true;
    for (let obj in files) {
      if (files[obj].type === undefined) {
        verify = false;
        break;
      }
    }
    return verify;
  }

  function getName(prop) {
    if (prop === "declarationHonneur")
      return CategorieFichierThese.DECLAR_HONNEUR;
    else if (prop === "diplomeLicense")
      return CategorieFichierThese.DIPLOME_LIC;
    else if (prop === "diplomeBaccalaureat")
      return CategorieFichierThese.DIPLOME_BAC;
    else if (prop === "attestationM2") return CategorieFichierThese.ATTEST_M2;
    else if (prop === "listeSelection")
      return CategorieFichierThese.LISTE_SELECT;
    else if (prop === "preuveValidation")
      return CategorieFichierThese.PREUVE_VALID;
    else if (prop === "ficheInscription")
      return CategorieFichierThese.FICHE_INSCRIP;
    else if (prop === "rapportEncadreur")
      return CategorieFichierThese.RAPPORT_ENC;
    else if (prop === "lettreEncadreur")
      return CategorieFichierThese.LETTRE_ENC;
    else if (prop === "lettreChefDepartement")
      return CategorieFichierThese.LETTRE_CHEF;
    else if (prop === "these") return CategorieFichierThese.THESE;
    else if (prop === "couverture") return CategorieFichierThese.COUVERTURE;
    else if (prop === "resume") return CategorieFichierThese.RESUME_THESE;
    else if (prop === "abstract") return CategorieFichierThese.ABSTRACT;
    else if (prop === "acteDeNaissance")
      return CategorieFichierThese.ACTE_NAISSANCE;
    else if (prop === "cv") return CategorieFichierThese.CV;
    else if (prop === "derogation") return CategorieFichierThese.DEROGATION;
    else if (prop === "attestationInscription")
      return CategorieFichierThese.ATTEST_INSCRIP;
  }

  const handleSubmit = () => {
    console.log(files);
    //get these subject 
    console.log(dataInfo.theseSubject);

    if (verification()) {
      let formData = new FormData();

      for (let prop in files) {
        formData.append(getName(prop), files[prop]);
      }

      formData.append("sujet", dataInfo.theseSubject);
      formData.append("niveau", "DOCTORAT");

      axios
        .put("/etudiants/uploader-fichiers", formData)
        .then((res) => {
          console.log(res);
          const dossier = res.data.dossier;

          axios
            .post("/envoyer-dossier", {
              envoyePar: user.id,
              envoyeParModel: ACTEURS.ETUDIANT,
              destinataireModel: ACTEURS.ADMIN,
              dossier: dossier.id,
            })
            .then((res) => {
              console.log(res);
              // Update dossier in localStorage
              user.dossier = dossier;
              localStorage.setItem("user", JSON.stringify(user));
              localStorage.removeItem("evolution");

              toast.success("Succes!", { hideProgressBar: true });

              // Wait for some seconds then close all toasts and display success 
              setTimeout(() => {
                toast.dismiss();
                setShowResult(true);
              }, 3000);
            });
        })
        .catch((err) => {
          console.error(err);
          toast.error("Une erreur est survenue!", { hideProgressBar: true });
        });
    } else {
      toast.error("Un ou plusieurs fichiers manquants!", {
        hideProgressBar: true,
      });
    }
  };

  const handleResultClick = () => {
    setShowResult(false);
    navigate("/account/evolution");
  };

  const getReturnOutput = () => {
    if (!canUpload) {
      return <Result title="Vous avez deja uploadé votre dossier!" />;
    } else if (!showResult) {
      return (
        <>
          <ToastContainer />
          <section className="depotDossier pt-4">
            <Steps
              progressDot
              className="d-none d-sm-flex"
              current={current}
              size="small"
              style={{ width: "88%" }}
            >
              {steps.map((item) => (
                <Step
                  className=""
                  key={item.title}
                  title={item.title}
                  style={{ width: "70px", margin: "0px 15px", padding: "0px" }}
                />
              ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>

            <div className="steps-action d-flex justify-content-around my-5">
              {current > 0 && (
                <Button
                  style={{
                    border: "1px solid var(--primaryColor)",
                    color: "var(--primaryColor)",
                    margin: "0 8px",
                  }}
                  onClick={() => prev()}
                >
                  Précédent
                </Button>
              )}

              {current === steps.length - 1 && (
                <Button
                  type="primary"
                  className="buttonSuivant"
                  onClick={handleSubmit}
                >
                  Envoyer
                </Button>
              )}
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  Suivant
                </Button>
              )}
            </div>
          </section>
        </>
      );
    } else if (showResult) {
      return (
        <Result
          status="success"
          title="Dossier envoyé avec succes!"
          subTitle="Vous recevrez un email dès que votre dossier sera validé. "
          extra={
            <Button type="primary" key="ok" onClick={handleResultClick}>
              OK
            </Button>
          }
        />
      );
    }
  };

  return getReturnOutput();
};

export default DepotDossierMaster;
