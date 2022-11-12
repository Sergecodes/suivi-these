import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";


const WelcomeComponent = (props) => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <section className="container-fluid welcome">
      <div className="welcomeContent ">
        <h1>Bienvenue à l'école doctorale STG</h1>
        <h4>Notre equipe est à votre dispostion pour vous aider</h4>
        <div className='d-flex' >
          <Link to="/inscription/etudiant"> 
            <button className=" rounded-pill welcomeButtonEmpty " style={user !== null ? { display: "none" } : {}}>
              <FaArrowRight className="me-2 mb-1" />
              S'inscrire
            </button>
          </Link>
          <Link to="/connexion/etudiant">
            <button className=" rounded-pill welcomeButtonFill " style={user !== null ? { display: "none" } : {}}>
              <FaArrowRight className="me-2 mb-1" />
              Se connecter
            </button>
          </Link>
          <Link to="/informations/presentation"> 
            <button className=" rounded-pill welcomeButtonFill" style={user === null ? { display: "none" } : {}}>
              {/* <FaArrowRight className="me-2 mb-1"/> */}
              Explorer
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default WelcomeComponent;