import React from 'react';
import AdministratorsHeader from "../../components/common/AdministratorsHeader";

const DepartementHeader = () => {
  return (
    <>
        <AdministratorsHeader
             nom={"Departement 1"}
             dashboardLink={"/acteur/departement/dashboard"}
             acteur={"Departement"}
             notification={"/acteur/departement/notifications"}
             profil={"/acteur/departement/profil"}
        >
        </AdministratorsHeader>
    </>
  )
}

export default DepartementHeader