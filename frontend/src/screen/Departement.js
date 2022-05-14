import React from 'react';
import DepartementHeader from '../components/pageDepartement/DepartementHeader';
import "../Styles/AdminCommon.css";
import { Outlet } from 'react-router-dom';

const Departement = () => {
  return (
    <div style={{backgroundColor: "#E9EAEF",minHeight:"100vh",maxWidth:"100vw",orverflow:"hidden"}}>
      <DepartementHeader/>
      <Outlet/>
      <p className="border border-top text-center fw-bold py-2" style={{backgroundColor:'var(--secondaryColor)',color:"white"}} >ECOLE DOCTORALE STG</p>

    </div>
  )
}

export default Departement