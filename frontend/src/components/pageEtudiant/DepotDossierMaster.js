import { useState, useEffect } from "react";
import { Steps, Button, message, Result } from "antd";
import FirstStep from "./EtapesMaster/FirstStep";
import SecondStep from "./EtapesMaster/SecondStep";
import ThirdStep from "./EtapesMaster/ThirdStep";
import {useSelector} from "react-redux";
import axios from "axios";
import {CategorieFichierMaster} from "../../constants/Constant";


const { Step } = Steps;

const DepotDossierMaster = () => {
  const [current, setCurrent] = useState(0);
  const files = useSelector(state=>state.masterFilesUpload);
  const [canUpload, setCanUpload] = useState(false);

  // Verifier si l'etudiant peut uploader
  useEffect(() => {
    axios.get('/etudiants/peut-uploader')
      .then(res => {
        console.log(res);
        setCanUpload(res.data.peutUploader);
      })
      .catch(err => {
        console.error(err);
      })
  }, []);

  const steps = [
    {
      title: (
        <p
          style={
            current === 0 ? (current === 0 ? { color: "var(--primaryColor)" } : {}) : {}
          }
        >
          Etape 1
        </p>
      ),
      content: <FirstStep />,
    },
    {
      title: <p style={current === 1 ? { color: "var(--primaryColor)" } : {}}>Etape 2</p>,
      content: <SecondStep />,
    },
    {
      title: <p style={current === 2 ? { color: "var(--primaryColor)" } : {}}>Etape 3</p>,
      content: <ThirdStep numero={1} />,
    }
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  function verification(){
    var verify=true;
      for(let obj in files){
        if(files[obj].type===undefined){
          verify=false;
          break;
        }
     
      }
    return verify;
  }

  function getName(prop){
    if(prop==="memoire") return CategorieFichierMaster.MEMOIRE;
    else if(prop==="attestationInscription" ) return CategorieFichierMaster.ATTEST_INSCRIP
    else if(prop==="rapportPresoutenance" ) return CategorieFichierMaster.RAPPORT_PRESOUTIENT
    else if(prop==="droitsUniversitaires" ) return CategorieFichierMaster.DROITS_UNIV
    else if(prop==="attestationLicense" ) return CategorieFichierMaster.ATTEST_LIC
    else if(prop==="releveM1" ) return CategorieFichierMaster.REL_NOTES_M1
    else if(prop==="releveM2" ) return CategorieFichierMaster.REL_NOTES_M2
    else if(prop==="listeSelection" ) return CategorieFichierMaster.LISTE_SELECT
    else if(prop==="ficheInscription" ) return CategorieFichierMaster.FICHE_INSCRIP
    else if(prop==="acteDeNaissance" ) return CategorieFichierMaster.ACTE_NAISSANCE
    else if(prop==="cv" ) return CategorieFichierMaster.CV
  }

  const handleSubmit= () => {
    console.log(files);
    if(verification()){
      var formData = new FormData();
    for(let prop in files){
        formData.append(getName(prop),files[prop]);
        
      }
      formData.append("sujet","rapport presoutenance");
      formData.append("niveau","MASTER 2");
        ///etudiants/uploader-fichiers
        axios.post('/etudiants/uploader-fichiers',formData)
        .then(res=>{
          console.log(res);
        })
        .catch(err=>{
          console.error(err);
        })
     
      message.success("Processing complete!");
    }
    else{
      message.error("un ou plusieurs fichiers manquants");
    }
  }

  const getReturnOutput = () => {
    if (canUpload) {
      return (
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
      );
    }

    return <Result title="Vous avez deja uploadé votre dossier!" />;
  }

  return getReturnOutput();
};


export default DepotDossierMaster;
