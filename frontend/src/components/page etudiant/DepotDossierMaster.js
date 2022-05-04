import React,{useState} from 'react'
import { Steps, Button, message } from 'antd';
import FirstStep from './EtapesMaster/FirstStep';
import SecondStep from './EtapesMaster/SecondStep';
import ThirdStep from "./EtapesMaster/ThirdStep"


const { Step } = Steps;

const DepotDossierMaster= () => {
  const [current, setCurrent] =useState(0);
   
const steps = [
  {
    title: <p style={current===0?current===0?{color:"#FF5821"}:{}:{}}>Etape 1</p>,
    content:<FirstStep/>,
  },
  {
    title: <p style={current===1?{color:"#FF5821"}:{}}>Etape 2</p>,
    content:<SecondStep/>,
  },
  {
    title: <p style={current===2?{color:"#FF5821"}:{}}>Etape 3</p>,
    content: <ThirdStep numero={1}/>,
  },
  
  {
    title: <p style={current===3?{color:"#FF5821"}:{}}>Etape 4</p>,
    content:<ThirdStep numero={2}/>,
  },

  {
    title: <p style={current===4?{color:"#FF5821"}:{}}>Etape 5</p>,
    content: <ThirdStep numero={3}/>,
  }
];

 

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  return(
  <section className="depotDossier pt-4">
    <Steps progressDot className="d-none d-sm-flex" current={current}  size="small" style={{width:"88%"}}>
    {steps.map(item => (
          <Step className="" key={item.title} title={item.title} style={{width:"70px",margin:"0px 15px",padding:"0px"}}/>
        ))}
    </Steps>
    <div className="steps-content">{steps[current].content}</div>
    
    <div className="steps-action d-flex justify-content-around my-5">
        {current > 0 && (
          <Button  style={{border:"1px solid #ff5821",color:"#ff5821", margin: '0 8px' }} onClick={() => prev()}>
            Précédent
          </Button>
        )}
      
        {current === steps.length - 1 && (
          <Button type="primary" className="buttonSuivant" onClick={() => message.success('Processing complete!')}>
            Envoyer
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Suivant
          </Button>
        )}
      </div>
  </section>)
};

export default DepotDossierMaster;