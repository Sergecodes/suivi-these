import React from 'react'
import {Outlet,useLocation} from "react-router-dom";
import CommonDashboard from '../components/page etudiant/CommonDashboard';

const Etudiant = () => {
  return (
    <div className="row d-flex justify-content-center" >
       <div className="col-3">
       <CommonDashboard url={useLocation().pathname}/>
       </div>
       <div className="col-6" >
         <Outlet/>
       </div>
        
    </div>
  )
}

export default Etudiant