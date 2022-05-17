import React from 'react';
import {FaArrowRight} from "react-icons/fa";
import {Link} from "react-router-dom";

const WelcomeComponent = (props) => {
  return (
    <section className="container-fluid welcome">
        <div className="welcomeContent ">
          <h1>Bienvenue à l'école doctorale STG</h1>
          <h4>Notre equipe est à votre dispostion pour vous aider</h4>
          <div className='d-flex' >
              <Link to="*"> <button className=" rounded-pill welcomeButtonEmpty " style={props.isLogin===false?{display:"none"}:{}}>
               <FaArrowRight className="me-2 mb-1"/>
                      S'inscrire
                   
               </button></Link>
               <Link to="/*"><button className=" rounded-pill welcomeButtonFill " style={props.isLogin===false?{display:"none"}:{}}>
                    <FaArrowRight className="me-2 mb-1"/>
                      Se connecter
                    
               </button></Link>
               <Link to="/*"> <button className=" rounded-pill welcomeButtonEmpty " style={props.isLogin===true?{display:"none"}:{}}>
                    <FaArrowRight className="me-2 mb-1"/>
                     Informations
                    
               </button></Link>
          </div>
        </div>
    </section>
  )
}

export default WelcomeComponent;