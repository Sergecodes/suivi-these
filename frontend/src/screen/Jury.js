import React from 'react';
import SidenavJury from "../components/page jury/SidenavJury";
import AdministratorsHeader from '../components/common/AdministratorsHeader';
import { JuryData } from '../constants/Constant';
import { useSelector } from 'react-redux';
import "../Styles/Sidenav.css";
import "../Styles/AdministratorsHeader.css";
import "../Styles/Jury.css";
import {useWindowSize} from "react-use";



import { Outlet } from 'react-router-dom';


const Jury = () => {
  const {width}=useWindowSize();
  const files=useSelector(state=>state.dashboardDisplay);
  return (
    <section className="d-flex" style={{backgroundColor:"#E9EAEF"}}>
        <SidenavJury/>
        <div className="mx-2" style={files.adminClicked===true||width<922?{width:"97%"}:{width:"79%"}}  >
          <AdministratorsHeader nom={JuryData.nom}/>
          <Outlet/>
        </div>
    </section>
  )
}

export default Jury