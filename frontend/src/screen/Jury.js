import React from 'react';
import JuryHeader from '../components/pageJury/JuryHeader';
import "../Styles/AdministratorsHeader.css";
import '../Styles/Jury.css';
import { Outlet } from 'react-router-dom';


const Jury = () => {
  return (
    <div style={{backgroundColor: "#E9EAEF",minHeight:"100vh",maxWidth:"100vw",orverflow:"hidden"}}>
      <JuryHeader/>
      <Outlet/>
      <p className="border border-top text-center fw-bold py-2" >ECOLE DOCTORALE STG</p>

    </div>
  )
}


export default Jury