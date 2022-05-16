import React from "react";
import AdministratorsHeader from "../common/AdministratorsHeader";


const JuryHeader = () => {
  return (
    <>
      <AdministratorsHeader
        nom={"NCHOUWET MFOUAPON"}
        dashboardLink={"/acteur/jury/dashboard"}
        acteur={"JURY"}
        notification={"/acteur/jury/notifications"}
        profil={"/acteur/jury/profil"}
      />
     
    </>
  );
};

export default JuryHeader;
