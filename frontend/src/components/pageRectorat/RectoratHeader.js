import React from 'react';
import AdministratorsHeader from "../../components/common/AdministratorsHeader";
import {BsCalendar2DateFill} from "react-icons/bs";
import { Link } from 'react-router-dom';

const RectoratHeader= () => {
  return (
    <>
        <AdministratorsHeader
             nom={"NCHOUWET MFOUAPON"}
             dashboardLink={"/acteur/rectorat/dashboard"}
             acteur={"Rectorat"}
             notification={"/acteur/rectorat/notifications"}
             profil={"/acteur/rectorat/profil"}
        >
          <Link to="/soutenance">
            <p style={{ margin: "0px" }}><BsCalendar2DateFill/> Soutenance</p>
          </Link>
        </AdministratorsHeader>
    </>
  )
}

export default RectoratHeader