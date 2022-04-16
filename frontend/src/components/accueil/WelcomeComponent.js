import React from 'react';
import {FaArrowRight} from "react-icons/fa"

const WelcomeComponent = (props) => {
  return (
    <section className="container-fluid welcome">
        <div className="welcomeText ">
          <h1>Bienvenue à l'école doctorale STG</h1>
          <h4>Notre equipe est à votre dispostion pour vous aider</h4>
          <div className='d-flex' style={{marginLeft:"12px"}} >
               <button className="fs-5 rounded-pill welcomeButtonEmpty me-5" style={props.isLogin===false?{display:"none"}:{}}>
               <FaArrowRight className="me-2 mb-1"/>
                      S'inscrire
                   
               </button>
               <button className="fs-5 rounded-pill welcomeButtonFill me-5" style={props.isLogin===false?{display:"none"}:{}}>
                    <FaArrowRight className="me-2 mb-1"/>
                      Se connecter
                    
               </button>
               <button className="fs-5 rounded-pill welcomeButtonEmpty me-5" style={props.isLogin===true?{display:"none"}:{}}>
                    <FaArrowRight className="me-2 mb-1"/>
                     Informations
                    
               </button>
          </div>
         {/* <div className="rounded-pill welcomeAction" style={props.isLogin===false?{display:"none"}:{marginLeft:"12px",width:"260px"}}>
              <a href="www.google.com" className="fs-5 " style={{textDecoration:"none",color:"white"}}>
                  Accéder à son profil
              </a>
              <span className="rounded-circle welcomeIcon d-flex  align-items-center justify-content-center">
                <RiAccountCircleFill style={{width:"170px", height:"30px"}} /> 
              </span>
          </div>*/} 
        </div>
    </section>
  )
}

export default WelcomeComponent;