import React from 'react';
import {FaGraduationCap} from "react-icons/fa";


const Sidenav = (props) => {
  return (
    <div className="sidenav" style={props.display===true?{display:"none"}:{}}>
        <p className="title"><FaGraduationCap/> ECOLE DOCTORALE</p>
        <hr/>
        <div className="actorInfo">
           <div>
              <p>{props.nom}</p>
              <p>{props.prenom}</p>
           </div>
            <p>{props.acteur}</p>
        </div>
        {props.children}
    </div>
  )
}

export default Sidenav