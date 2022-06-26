import { Steps } from "antd";


const { Step } = Steps;


const EvolutionDossier = () => {
  const current = 2;
  const etapesDossier = {
    1: {
      titre: 'Envoi du dossier de soutenance',
      debuteeLe: 'Mon, September 18 at 10:07 AM',
      acheveeLe: 'Tues, September 19 at 10:07 PM',
      gereePar: 'Etudiant',
    },
    2: {
      titre: 'Vérification du dossier',
      debuteeLe: 'Mon, September 18 at 10:07 AM',
      acheveeLe: 'Tues, September 19 at 10:07 PM',
      gereePar: 'Departement'
    },
    3: {
      titre: 'Notation du dossier',
      debuteeLe: '',
      acheveeLe: '',
      gereePar: 'Jury'
    },
    4: {
      titre: 'Evaluation de la notation',
      debuteeLe: '',
      acheveeLe: '',
      gereePar: 'CRFD'
    },
    5: {
      titre: 'Vérification du rapport du CRFD',
      debuteeLe: '',
      acheveeLe: '',
      gereePar: 'Coordonnateur'
    },
    6: {
      titre: 'Programmation de la date de soutenance',
      debuteeLe: '',
      acheveeLe: '',
      gereePar: 'Coordonnateur'
    },
  };

  const steps = (function() {
    let result = [];

    for (let num in etapesDossier) {
      const etape = etapesDossier[num];
      result.push({ ...etape });
    }

    return result;
  })();

  return (
    <section className="evolution mt-3 mx-5">
      <Steps className="" current={current} direction="vertical">
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
                  <span className="mx-2">-</span>
                  <p>{item.acheveeLe}</p>
                </div>
                <p>
                  <span classname="fw-bold">Geree par: </span> 
                  {item.gereePar}
                </p>
              </div>
            }
          />
        ))}
      </Steps>
    </section>
  );
};

export default EvolutionDossier;
