import React,{useState} from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import 'antd/dist/antd.min.css';



/*import Accueil from './screen/Accueil';
<Route path="/accueil" element={<Accueil isLogin={isLogin}/>}/>*/
import Etudiant from './screen/Etudiant';
import StudentProfile from './components/page etudiant/StudentProfile';
import DepotDossier from './components/page etudiant/DepotDossier';
import EvolutionDossier from './components/page etudiant/EvolutionDossier';

const App = () => {
  const [isLogin,setIsLogin]= useState(true);
 
  return (
    <BrowserRouter>
        <div className="App">
          <Routes>
         
            <Route path="/account" element={<Etudiant/>}>
              <Route path="/account/depot" element={<DepotDossier/>}/>
              <Route path="/account/profil" element={<StudentProfile/>}/>
              <Route path="/account/evolution" element={<EvolutionDossier/>}/>


            </Route>
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
