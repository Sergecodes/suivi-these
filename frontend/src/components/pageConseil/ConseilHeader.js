import React from "react";
import AdministratorsHeader from "../common/AdministratorsHeader";

const ConseilHeader = () => {
  return (
    <>
      <AdministratorsHeader
        nom={"Conseil 1"}
        dashboardLink={"/acteur/conseil/dashboard"}
        acteur={"CONSEIL"}
        notification={"/acteur/conseil/notifications"}
        profil={"/acteur/conseil/profil"}
      >
        
      </AdministratorsHeader>
    </>
  );
};

export default ConseilHeader;
