import { useEffect, useState } from 'react';
import { Steps } from "antd";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';


const { Step } = Steps;

const EvolutionDossierThese = () => {
  const [currentEtape, setCurrentEtape] = useState(0);
  const [evolution, setEvolution] = useState({
    1: {
      titre: 'Envoi du dossier de soutenance',
      debuteeLe: 'Mon, September 18 at 10:07 AM',
      acheveeLe: 'Tues, September 19 at 10:07 PM',
      gereePar: 'Etudiant',
    },
  });

  const steps = (function() {
    let result = [];
    for (let num in evolution) {
      const etape = evolution[num];
      result.push({ ...etape });
    }

    return result;
  })();

  useEffect(() => {
    // First check in localStorage if results are present. If not present,
    // call endpoint and store result in localStorage for given period (say 1day)
    let numEtapeActuelle = parseInt(localStorage.getItem('numEtapeActuelle'), 10);
    let evolution = JSON.parse(localStorage.getItem('evolution'));

    if (isNaN(numEtapeActuelle) || evolution === null) {
      axios.get('/etudiants/evolution-dossier')
        .then(res => {
          console.log(res);
          evolution = res.data.evolution;
          numEtapeActuelle = res.data.numEtapeActuelle;

          setEvolution(evolution);
          setCurrentEtape(numEtapeActuelle);
          // todo also set validity period
          localStorage.setItem('evolution', JSON.stringify(evolution));
          localStorage.setItem('numEtapeActuelle', numEtapeActuelle);
        })
        .catch(err => {
          console.error(err);
          toast.error("Une erreur est survenue", { hideProgressBar: true });
        });
    } else {
      setEvolution(evolution);
      setCurrentEtape(numEtapeActuelle - 1);
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <section className="evolution mt-3 mx-5">
        <Steps className="" current={currentEtape} direction="vertical">
          {steps.map(item => (
            <Step
              className="pb-2 fw-bold"
              key={item.titre}
              title={<p className="evolutionStepTitle">{item.titre}</p>}
              description={
                <div
                  className="evolutionStepInfo"
                  style={item.debuteeLe ? {} : { display: 'none' }}
                >
                  <div className="d-flex align-items-center">
                    <p>{item.debuteeLe}</p>

                  {/* Remove acheveeLe section if debuteeLe & acheveeLe datetimes
                    are the same. This is the case with the "Envoi du dossier de soutenance"
                    step (which is the first step).
                   */}
                  <div style={item.debuteeLe === item.acheveeLe ? { display: 'none' } : {}}>
                    <span className="mx-2">-</span>
                    <p>{item.acheveeLe}</p>
                  </div>
                  </div>
                  <p>
                    <span className="fw-bold">Geree par: </span> 
                    {item.gereePar}
                  </p>
                </div>
              }
            />
          ))}
        </Steps>
      </section>
    </>
  );
};

export default EvolutionDossierThese;
