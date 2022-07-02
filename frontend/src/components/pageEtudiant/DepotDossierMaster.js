import { useState, useEffect } from "react";
import { Steps, Button, Result } from "antd";
import FirstStep from "./EtapesMaster/FirstStep";
import SecondStep from "./EtapesMaster/SecondStep";
import ThirdStep from "./EtapesMaster/ThirdStep";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { CategorieFichierMaster, ACTEURS } from "../../constants/Constant";
import { useNavigate } from "react-router-dom";

const { Step } = Steps;

const DepotDossierMaster = () => {
  const [current, setCurrent] = useState(0);
  const [canUpload, setCanUpload] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();
  const files = useSelector((state) => state.masterFilesUpload);
  const dataInfo = useSelector((state) => state.dataStorage);
  const user = JSON.parse(localStorage.getItem("user"));

  // Verifier si l'etudiant peut uploader
  useEffect(() => {
    axios
      .get("/etudiants/peut-uploader")
      .then((res) => {
        console.log(res);
        setCanUpload(res.data.peutUploader);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const steps = [
    {
      title: (
        <p
          style={
            current === 0
              ? current === 0
                ? { color: "var(--primaryColor)" }
                : {}
              : {}
          }
        >
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
      content: <ThirdStep numero={1} />,
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
    if (prop === "memoire") return CategorieFichierMaster.MEMOIRE;
    else if (prop === "attestationInscription")
      return CategorieFichierMaster.ATTEST_INSCRIP;
    else if (prop === "rapportPresoutenance")
      return CategorieFichierMaster.RAPPORT_PRESOUTIENT;
    else if (prop === "droitsUniversitaires")
      return CategorieFichierMaster.DROITS_UNIV;
    else if (prop === "attestationLicense")
      return CategorieFichierMaster.ATTEST_LIC;
    else if (prop === "releveM1") return CategorieFichierMaster.REL_NOTES_M1;
    else if (prop === "releveM2") return CategorieFichierMaster.REL_NOTES_M2;
    else if (prop === "listeSelection")
      return CategorieFichierMaster.LISTE_SELECT;
    else if (prop === "ficheInscription")
      return CategorieFichierMaster.FICHE_INSCRIP;
    else if (prop === "acteDeNaissance")
      return CategorieFichierMaster.ACTE_NAISSANCE;
    else if (prop === "cv") return CategorieFichierMaster.CV;
  }

  const handleSubmit = () => {
    console.log(files);

    //jury data stored in redux
    console.log(dataInfo.jury);

    if (verification()) {
      let formData = new FormData();

      for (let prop in files) {
        formData.append(getName(prop), files[prop]);
      }

      // todo, insert sujet data in state too
      const sujet = "sujet";
      formData.append("sujet", sujet);
      formData.append("niveau", "MASTER 2");

      Promise.all([
        axios.put("/etudiants/uploader-fichiers", formData),
        axios.put(`/etudiants/${user.id}/set-juges-et-sujet`, {
          // todo: update with real data from state
          juges: [],
        }),
      ])
        .then((results) => {
          const [res1, res2] = results;
          console.log(res1);
          console.log(res2);

          const dossier = res1.data.dossier;
          // Update dossier in localStorage
          dossier.sujet = sujet;
          user.dossier = dossier;
          localStorage.setItem("user", JSON.stringify(user));

          axios
            .post("/envoyer-dossier", {
              envoyePar: user.id,
              envoyeParModel: ACTEURS.ETUDIANT,
              destinataire: user.departement.id,
              destinataireModel: ACTEURS.DEPARTEMENT,
              dossier: dossier.id,
            })
            .then((res) => {
              console.log(res);
              toast.success("Succes!", { hideProgressBar: true });
            })
            .catch((err) => {
              console.error(err);
              toast.error("Une erreur est survenue!", {
                hideProgressBar: true,
              });
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
    navigate("/account");
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
          title="Dossier envoye avec succes!"
          subTitle="Vous recevrez un email dès que votre dossier sera valide. "
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
