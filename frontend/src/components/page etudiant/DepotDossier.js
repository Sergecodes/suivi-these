import { Steps, Divider, Button, message } from 'antd';
import React,{useState} from "react";
import FirstStep from './Etapes Depot/FirstStep';


const { Step } = Steps;

const Etapes= () => {
   
const steps = [
  {
    title: 'Etape 1',
    content:<FirstStep/>,
  },
  {
    title: 'Etape 2',
    content:<FirstStep/>,
  },
  {
    title: 'Etape 3',
    content: <FirstStep/>,
  },
  
  {
    title: 'Etape 4',
    content: 'fourth-content',
  },

  {
    title: 'Etape 5',
    content: 'fifth-content',
  },

  {
    title: 'Etape 6',
    content: 'Last-content',
  }
];

  const [current, setCurrent] =useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  return(
  <section className=" pt-4">
    <Steps type="navigation" className="site-navigation-steps" current={current}  size="small" style={{}}>
    {steps.map(item => (
          <Step className="" key={item.title} title={item.title} style={{width:"70px",margin:"0px 15px",padding:"0px"}}/>
        ))}
    </Steps>
    <div className="steps-content">{steps[current].content}</div>
    
    <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Suivant
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Envoyer
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Précédent
          </Button>
        )}
      </div>
  </section>)
};

export default Etapes;