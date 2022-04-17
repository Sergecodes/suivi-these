import React from 'react';
import WelcomeComponent from "../components/accueil/WelcomeComponent";
import UtilityComponent from "../components/accueil/UtilityComponent";
import UnitéComponent from "../components/accueil/UnitéComponent";
import Header from "../screen/Header";
import Footer from "../screen/Footer";



const Accueil = (props) => {
  return (
    <>
        <Header isLogin={props.isLogin}/>
        <WelcomeComponent isLogin={props.isLogin}/>
        <UtilityComponent/>
        <UnitéComponent/>
        <Footer/>
    </>
  )
}

export default Accueil