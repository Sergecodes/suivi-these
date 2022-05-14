import React from 'react';
import RectoratHeader from '../components/pageRectorat/RectoratHeader';
import "../Styles/AdminCommon.css";
import { Outlet } from 'react-router-dom';
import '../Styles/Rectorat.css'

const Rectorat = () => {
  return (
    <div style={{minHeight:"93vh",backgroundColor: "#E9EAEF",position:"relative",maxWidth:"100vw",orverflow:"hidden"}}>
      <div style={{margin:"0",padding:'0',minHeight:'93vh'}}>
        <RectoratHeader/>
        <Outlet/>
      </div>
      <p className="border border-top text-center fw-bold py-2" style={{backgroundColor:'var(--secondaryColor)',color:"white"}} >ECOLE DOCTORALE STG</p>

    </div>
  )
}

export default Rectorat