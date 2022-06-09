import React from 'react';
import WelcomeComponent from "../components/accueil/WelcomeComponent";
import UtilityComponent from "../components/accueil/UtilityComponent";
import UnitéComponent from "../components/accueil/UnitéComponent";
import Equipe from '../components/accueil/Equipe';
import Header from "../screen/Header";
import Footer from "../screen/Footer";
import Map from '../components/accueil/Map';



const Accueil = (props) => {
  return (
    <>
        <Header isLogin={props.isLogin}/>
        <WelcomeComponent isLogin={props.isLogin}/>
        <UtilityComponent/>
        <UnitéComponent/>
        <Equipe/>
        <Map/>
        <Footer/>
    </>
  )
}

export default Accueil