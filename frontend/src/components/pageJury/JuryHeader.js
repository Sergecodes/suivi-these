import React from "react";
import AdministratorsHeader from "../common/AdministratorsHeader";
import { BsDownload } from "react-icons/bs";
import { Link } from "react-router-dom";

const JuryHeader = () => {
  return (
    <>
      <AdministratorsHeader
        nom={"NCHOUWET MFOUAPON"}
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
