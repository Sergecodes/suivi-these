import React from 'react';
import WelcomeComponent from "../components/accueil/WelcomeComponent";
import UtilityComponent from "../components/accueil/UtilityComponent";
import UnitéComponent from "../components/accueil/UnitéComponent";
import Equipe from '../components/accueil/Equipe';
import Header from "../screen/Header";
import Footer from "../screen/Footer";
import Map from '../components/accueil/Map';
import "../index.css";



const Accueil = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isLogin = Boolean(user);
  return (
    <>
        <Header isLogin={isLogin}/>
        <WelcomeComponent isLogin={isLogin}/>
        <UtilityComponent/>
        <UnitéComponent/>
        <Equipe/>
        <Map/>
        <Footer/>
    </>
  )
}

export default Accueil