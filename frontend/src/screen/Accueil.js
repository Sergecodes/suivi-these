import React from 'react';
import WelcomeComponent from "../components/accueil/WelcomeComponent";
import UtilityComponent from "../components/accueil/UtilityComponent";
import UnitéComponent from "../components/accueil/UnitéComponent";


const Accueil = (props) => {
  return (
    <>
        <WelcomeComponent isLogin={props.isLogin}/>
        <UtilityComponent/>
        <UnitéComponent/>
    </>
  )
}

export default Accueil