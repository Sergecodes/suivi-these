import React from 'react'
import AdministratorsHeader from "../common/AdministratorsHeader"


const ExpertHeader = () => {
  return (
    <>
      <AdministratorsHeader
        nom={"NCHOUWET MFOUAPON"}
        dashboardLink={"/acteur/expert/dashboard"}
        acteur={"EXPERT"}
        notification={"/acteur/expert/notifications"}
        profil={"/acteur/expert/profil"}
      >
       
        
      </AdministratorsHeader>
    </>
  )
}

export default ExpertHeader