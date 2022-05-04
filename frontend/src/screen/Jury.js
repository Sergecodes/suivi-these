import React from 'react';
import SidenavJury from "../components/page jury/SidenavJury";
import AdministratorsHeader from '../components/common/AdministratorsHeader';
import "../Styles/Sidenav.css";
import "../Styles/AdministratorsHeader.css";
import { JuryData } from '../constants/Constant';

const Jury = () => {
  return (
    <section className="d-flex" style={{backgroundColor:"#E9EAEF"}}>
        <SidenavJury/>
        <div className="mx-2" style={{width:"100%"}}  >
          <AdministratorsHeader nom={JuryData.nom}/>
        </div>
    </section>
  )
}

export default Jury