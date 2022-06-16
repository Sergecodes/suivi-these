import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "antd/dist/antd.min.css";

    /*************************************page accueil************************************/
import Accueil from "./screen/Accueil";
    /**************************************************************************************************/

    /*************************************page soutenance************************************/
//import Soutenance from "./screen/Soutenance";
    /**************************************************************************************************/

    
    /********************************************page info ecole doctorale*********************************/
   /*import CandidatureScreen from "./screen/InfotmationScreens/CandidatureScreen";
    import DocumentImportantScreen from "./screen/InfotmationScreens/DocumentImportantScreen";
    import EquipeScreen from "./screen/InfotmationScreens/EquipeScreen";
    import SuivieDeFormation from "./screen/InfotmationScreens/SuivieDeFormation";
    import FormationEnTheseScreen from "./screen/InfotmationScreens/FormationEnTheseScreen";
    import InscriptionScreen from "./screen/InfotmationScreens/InscriptionScreen";
    import Presentation from "./screen/InfotmationScreens/Presentation";
    import ProceduredeSoutenanceScreen from "./screen/InfotmationScreens/ProceduredeSoutenanceScreen";
    import TheseEnCotutelleScreen from "./screen/InfotmationScreens/TheseEnCotutelleScreen";
    import TheseEnCoursScreen from "./screen/InfotmationScreens/TheseEnCoursScreen";
    import UnitesRechercheScreen from "./screen/InfotmationScreens/UnitesRechercheScreen";
    import ConseilScientifiqueScreen from "./screen/InfotmationScreens/ConseilScientifiqueScreen"*/ 
    
/**************************************************************************************************/

    /*************************************pages inscription et connexion************************************/
/*import AdminInscriptionScreen from "./screen/inscriptionScreens/AdminConnexionScreen.js";
import ConseilScientifiqueInscriptionScreen from "./screen/inscriptionScreens/ConseilScientifiqueConnexionScreen.js";
import CoordonateurInscriptionScreen from "./screen/inscriptionScreens/CoordonateurConnexionScreen.js";
import EtudiantInscriptionScreen from "./screen/inscriptionScreens/etudiantInscriptionScreen.js";
import ExpertInscriptionScreen from "./screen/inscriptionScreens/ExpertConnexionScreen.js";
import JuryInscriptionScreen from "./screen/inscriptionScreens/JuryConnexionScreen.js";
import RectoratInscriptionScreen from "./screen/inscriptionScreens/RectoratConnexionScreen.js";
import EtudiantConnexionScreen from "./screen/inscriptionScreens/EtudiantConnexionScreen.js";
import DepartementConnexionScreen from "./screen/inscriptionScreens/DepartementConnexionScreen";*/
    /**************************************************************************************************/


    /************************************************page etudiant************************************/
/*import Etudiant from "./screen/Etudiant";
import DepotDossierMaster from "./components/pageEtudiant/DepotDossierMaster";
import EvolutionDossier from "./components/pageEtudiant/EvolutionDossier";
import ProfilEtudiant from "./components/pageEtudiant/ProfilEtudiant";*/
    /**************************************************************************************************/

    /************************************************page expert************************************/
/*import Expert from "./screen/Expert";
import NotationThese from "./components/pageExpert/NotationThese";
import ProfilExpert from "./components/pageExpert/ProfilExpert";
import DashboardExpert from "./components/pageExpert/dashBoardExpert"
import NotificationExpert from "./components/pageExpert/NotificationExpert"*/
    /**************************************************************************************************/


    /************************************************page departement************************************/
/*import Departement from "./screen/Departement";
import ProfilDepartement from "./components/pageDepartement/ProfilDepartement";
import DashboardDepartement from "./components/pageDepartement/DashboardDepartement"
import NotificationDepartement from "./components/pageDepartement/NotificationDepartement";
import VerificationMaster from "./components/pageDepartement/VerificationMaster";*/
    /**************************************************************************************************/
  
  /************************************************page rectorat************************************/
/*import Rectorat from "./screen/Rectorat";
import ProfilRectorat from "./components/pageRectorat/ProfilRectorat";
import DashboardRectorat from "./components/pageRectorat/DashboardRectorat"
import NotificationRectorat from "./components/pageRectorat/NotificationRectorat";
import Programmation from "./components/pageRectorat/Programmation";*/
    /**************************************************************************************************/

     /************************************************page jury************************************/
/*import Jury from "./screen/Jury";
import NotationMaster from "./components/pageJury/NotationMaster";
import ProfilJury from "./components/pageJury/ProfilJury";
import NotificationJury from "./components/pageJury/NotificationJury";
import TableList from "./components/pageJury/TableList";*/
    /**************************************************************************************************/

    /************************************************page admin************************************/
    //import Admin from "./screen/Admin";
    /**************************************************************************************************/


  /************************************************page coordonateur************************************/
/*
  import HomeCoordonateurDashboard from "./components/pageCoordonateur/HomeCoordonateurDashboard";
  import ProfilCoordonateur from "./components/pageCoordonateur/ProfilCoordonateur";
  import RapportAudition from "./components/pageCoordonateur/RapportAudition";
  import AutorisationDeSoutenance from "./components/pageCoordonateur/AutorisationDeSoutenance";
  import RapportEtudiant from "./components/pageCoordonateur/RapportEtudiant";
  import DateDeSoutenance from "./components/pageCoordonateur/DateDeSoutenance";
  import NotificationCoordonateur from "./components/pageCoordonateur/NotificationCoordonateur";*/
    /**************************************************************************************************/


// Configurer les options par defaut d'axios
import axios from "axios";

axios.defaults.baseURL = process.env.API_BASE_URL || "http://localhost:8001/api/";




const App = () => {
  const isLogin = true;

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Accueil isLogin={isLogin} />} />

          { /**     
          <Route
            path="/soutenance"
            element={<Soutenance isLogin={isLogin} />}
          />*/ }
            

          {
            /** 
             * <Route path="/account" element={<Etudiant />}>
            <Route path="/account/depot" element={<DepotDossierMaster />} />
            <Route path="/account/profil" element={<ProfilEtudiant />} />
            <Route path="/account/evolution" element={<EvolutionDossier />} />
          </Route>
           
           */ }
         

          { /*<Route path="/acteur/jury" element={<Jury />}>

            <Route path="/acteur/jury/dashboard" element={<TableList />} />
            <Route path="/acteur/jury/notation" element={<NotationMaster />} />
            <Route path="/acteur/jury/profil" element={<ProfilJury />} />
            <Route
              path="/acteur/jury/notifications"
              element={<NotificationJury />}
            />
          </Route>*/}
       
        
          { /* <Route path="/acteur/expert" element={<Expert />}>
            <Route path="/acteur/expert/dashboard" element={<TableList />} />
            <Route path="/acteur/expert/notation" element={<NotationThese />} />
            <Route path="/acteur/expert/profil" element={<ProfilJury />} />
            <Route
              path="/acteur/expert/notifications"
              element={<NotificationExpert />}
            />
        </Route>*/}
        {/** 
         *  <Route path="/acteur/departement" element={<Departement />}>
            <Route path="/acteur/departement/dashboard" element={<DashboardDepartement />} />
            <Route path="/acteur/departement/profil" element={<ProfilDepartement />} />
            <Route path="/acteur/departement/verification" element={<VerificationMaster />} />

            <Route
              path="/acteur/departement/notifications"
              element={<NotificationDepartement />}
            />
          </Route>
         */}
          
          {/** 
           * <Route path="/acteur/rectorat" element={<Rectorat />}>
            <Route path="/acteur/rectorat/dashboard" element={<DashboardRectorat />} />
            <Route path="/acteur/rectorat/profil" element={<ProfilRectorat />} />


            <Route
              path="/acteur/rectorat/notifications"
              element={<NotificationRectorat />}
            />
            <Route
              path="/acteur/rectorat/programmation"
              element={<Programmation />}
            />
          </Route>
          */}
          {
            /**
             *  <Route path="/acteur/admin" element={<Admin/>} />
             */
          }
          <Route
            path="/*"
            element={
              <div className="d-flex flex-column align-items-center text-align-center">
                <h1 style={{ color: "red" }}>ERROR !</h1>
                <h2 style={{ fontWeight: "none" }}>
                  Fonctionnalité pas encore developée
                </h2>
              </div>
            }
          />
          

          {/* Routes pour les coordonateurs
          <Route
            path="/acteur/coordonateur"
            element={<HomeCoordonateurDashboard />}
          ></Route>
          <Route
            path="/acteur/coordonateur/profil"
            element={<ProfilCoordonateur />}
          ></Route>
          <Route
            path="/acteur/coordonateur/audition"
            element={<RapportAudition />}
          ></Route>
          <Route
            path="/acteur/coordonateur/etudiant"
            element={<RapportEtudiant />}
          ></Route>
          <Route
            path="/acteur/coordonateur/autorisation"
            element={<AutorisationDeSoutenance />}
          ></Route>{" "}
          <Route
            path="/acteur/coordonateur/date"
            element={<DateDeSoutenance />}
          ></Route>
          <Route
            path="/acteur/coordonateur/notification"
            element={<NotificationCoordonateur />}
          ></Route>*/}
          { /* <Route
            path="/connexion/admin"
            element={<AdminInscriptionScreen />}
          ></Route>
          <Route
            path="/connexion/expert"
            element={<ExpertInscriptionScreen />}
          ></Route>
          <Route
            path="/inscription/etudiant"
            element={<EtudiantInscriptionScreen />}
          ></Route>
          <Route
            path="/connexion/etudiant"
            element={<EtudiantConnexionScreen />}
          ></Route>
          <Route
            path="/connexion/rectorat"
            element={<RectoratInscriptionScreen />}
          ></Route>
          <Route
            path="/connexion/jury"
            element={<JuryInscriptionScreen />}
          ></Route>
          <Route
            path="/connexion/coordonateur"
            element={<CoordonateurInscriptionScreen />}
          ></Route>
          <Route
            path="/connexion/conseil-scientifique"
            element={<ConseilScientifiqueInscriptionScreen />}
          ></Route>
          <Route
            path="/connexion/departement"
            element={<DepartementConnexionScreen />}
          ></Route> */}
        
          {/* Routes qui concernent les information sur tous ce quil y'a a savoir sur les these et autres
          <Route path="/candidature" element={<CandidatureScreen />}></Route>
          <Route path="/document" element={<DocumentImportantScreen />}></Route>
          <Route path="/equipe" element={<EquipeScreen />}></Route>
          <Route path="/formation" element={<FormationEnTheseScreen />}></Route>
          <Route path="/Inscription" element={<InscriptionScreen />}></Route>
          <Route path="/presentation" element={<Presentation />}></Route>
          <Route path="/canditature" element={<CandidatureScreen />}></Route>
          <Route path="/Procedure"  element={<ProceduredeSoutenanceScreen />}
          ></Route>
          <Route path="/Suivie" element={<SuivieDeFormation />}></Route>
          <Route path="/these-cotutelle" element={<TheseEnCotutelleScreen />} ></Route>
          <Route path="/these-cours" element={<TheseEnCoursScreen />}></Route>
          <Route path="/unites-recherche" element={<UnitesRechercheScreen />}></Route>
          <Route path="/conseil" element={<ConseilScientifiqueScreen />}></Route>
          <Route path="/document" element={<DocumentImportantScreen />}></Route> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
