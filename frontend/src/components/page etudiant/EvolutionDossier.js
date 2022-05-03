import React,{useState} from 'react'

import { Steps } from 'antd';

const { Step } = Steps;

const EvolutionDossier=()=> {
    const [current,setCurrent]=useState(2);
    const steps = [
        {
          title: <p className="evolutionStepTitle">Envoi du dossier de soutenance</p>,
          description:<div className="evolutionStepInfo" style={current<=0?{display:"none"}:{}}>
              <div className="d-flex align-items-center">
                  <p>Mon, September 18 at 10:07 AM</p>
                  <span className="mx-2">-</span>
                  <p>Tues, September 19 at 10:07 PM</p>
              </div>
              <p>Coordonnateur</p>
          </div>
        },
        {
          title: <p className="evolutionStepTitle">Vérification du dossier par le departement</p>,
          description:<div className="evolutionStepInfo" style={current<=1?{display:"none"}:{}}>
              <div className="d-flex align-items-center">
                  <p>Mon, September 18 at 10:07 AM</p>
                  <span className="mx-2">-</span>
                  <p>Tues, September 19 at 10:07 PM</p>
              </div>
              <p>Departement</p>
          </div>
        },
        {
          title: <p className="evolutionStepTitle">Notation par les membres du Jury</p>,
          description:<div className="evolutionStepInfo" style={current<=2?{display:"none"}:{}}>
              <div className="d-flex align-items-center">
                  <p>Mon, September 18 at 10:07 AM</p>
                  <span className="mx-2">-</span>
                  <p>Tues, September 19 at 10:07 PM</p>
              </div>
              <p>Jury</p>
          </div>
          
        },
        
        {
          title: <p className="evolutionStepTitle">Evaluation de la notation par admin</p>,
          description:<div className="evolutionStepInfo" style={current<=3?{display:"none"}:{}}>
              <div className="d-flex align-items-center">
                  <p>Mon, September 18 at 10:07 AM</p>
                  <span className="mx-2">-</span>
                  <p>Tues, September 19 at 10:07 PM</p>
              </div>
              <p>Admin</p>
          </div>
        },
      
        {
            title: <p className="evolutionStepTitle">Vérification du memoire par le coordonnateur</p>,
          description:<div className="evolutionStepInfo" style={current<=4?{display:"none"}:{}}>
              <div className="d-flex align-items-center">
                  <p>Mon, September 18 at 10:07 AM</p>
                  <span className="mx-2">-</span>
                  <p>Tues, September 19 at 10:07 PM</p>
              </div>
              <p>coordonnateur</p>
          </div>
        },
      
        {
          title: <p className="evolutionStepTitle">Programmation date de soutenance</p>,
          description:<div className="evolutionStepInfo" style={current<=5?{display:"none"}:{}}>
              <div className="d-flex align-items-center">
                  <p>Mon, September 18 at 10:07 AM</p>
                  <span className="mx-2">-</span>
                  <p>Tues, September 19 at 10:07 PM</p>
              </div>
              <p>coordonnateur</p>
          </div>
        }
      ];
      
    return (
      <section className="evolution mt-3 mx-5">

        <Steps className="" current={current}   direction="vertical" >
          {steps.map(item => (
          <Step className="pb-2 fw-bold "  key={item.title} title={item.title} description={item.description}  />
        ))}
        </Steps>
      </section>
    )
}

export default EvolutionDossier;