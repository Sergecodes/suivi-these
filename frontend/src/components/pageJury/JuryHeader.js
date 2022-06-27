import React from "react";
import AdministratorsHeader from "../common/AdministratorsHeader";

const JuryHeader = () => {
  return (
    <>
      <AdministratorsHeader
        nom={"Jury 1"}
        dashboardLink={"/acteur/jury/dashboard"}
        acteur={"JURY"}
        notification={"/acteur/jury/notifications"}
        profil={"/acteur/jury/profil"}
      >
        
      </AdministratorsHeader>
    </>
  );
};

export default JuryHeader;
