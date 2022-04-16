import React from 'react';
import {FaEnvelope,FaArrowRight} from "react-icons/fa";
import {BsClock, BsTelephoneFill} from "react-icons/bs";
import {GoLocation} from "react-icons/go";


const TopHeader = (props) => {
  return (
    <section className="container-fluid topHeader px-5 "  >
        <div className="d-flex justify-content-around topHeaderInfo fs-6">
            <span><FaEnvelope className="topHeaderIcon"/> ecoledoctorale@gmail.com</span>
            <span><BsTelephoneFill className="topHeaderIcon"/> 243898521</span>
            <span><BsClock className="topHeaderIcon"/> Lun-Ven 10h-18h</span>
            <span><GoLocation className="topHeaderIcon"/> B.P, 812 Yaoundé 1</span>
        </div>
        <div className="d-flex justify-content-end">
          <button className="my-1 me-1 headerIconEmpty rounded-pill"  style={props.isLogin===false?{display:"none"}:{}}> Se connecter</button>
          <button className=" my-1 px-4 ms-3 headerIconFull rounded-pill"  style={props.isLogin===false?{display:"none"}:{}}>S'inscrire</button>
          <button className=" my-1 px-4 ms-3 headerIconFull rounded-pill" style={props.isLogin===true?{display:"none"}:{}}>Profil</button>
          <button className=" my-1 px-3 ms-3 headerIconEmpty rounded-pill" style={props.isLogin===true?{display:"none"}:{}}>Deconnexion</button>
          
          {/*<button className="border rounded-pill">Profil</button>*/}
        </div>
    </section>
  )
}

export default TopHeader