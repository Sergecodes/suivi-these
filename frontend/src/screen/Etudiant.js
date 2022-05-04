import React from 'react';
import StudentDashboard from '../components/page etudiant/StudentDashboard';
import "../components/page etudiant/etudiant.css";
import NavbarEtudiant from '../components/page etudiant/NavbarEtudiant';
import { Outlet } from 'react-router-dom';
import { setClicked } from "../redux/DashboardDisplaySlice";
import {useSelector,useDispatch} from "react-redux";



const Etudiant = () => {

  const dispatch=useDispatch();
  const files=useSelector(state=>state.dashboardDisplay);
  const handeClick=()=>{
    if( files.clicked===true){
      dispatch(setClicked())
    }
  }

  return (
    <section className="d-flex" >
            <StudentDashboard />
            <div className="studentContent" onClick={handeClick}>
              <NavbarEtudiant/>
              <div className="px-3">
              <Outlet/>
              </div>
            </div>
    </section>
  )
}

export default Etudiant