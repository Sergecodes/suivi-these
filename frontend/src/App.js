import React,{useState} from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";


import Accueil from './screen/Accueil';




const App = () => {
  const [isLogin,setIsLogin]= useState(true);
 
  return (
    <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Accueil isLogin={isLogin}/>}/>
            <Route path="/*" element ={<div className="d-flex flex-column align-items-center text-align-center">
              <h1 style={{color:"red"}}>ERROR !</h1>
              <h2 style={{fontWeight:"none"}}>Fonctionnalité pas encore developée</h2>
              </div>}
              />
               

          </Routes>
        </div>
    </BrowserRouter>
   
  )
}

export default App;
