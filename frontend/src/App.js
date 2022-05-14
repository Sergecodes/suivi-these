import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "antd/dist/antd.min.css";

/*import Accueil from "./screen/Accueil";
import AdminInscriptionScreen from "./screen/inscriptionScreens/AdminConnexionScreen.js";
import ConseilScientifiqueInscriptionScreen from "./screen/inscriptionScreens/ConseilScientifiqueConnexionScreen.js";
import CoordonateurInscriptionScreen from "./screen/inscriptionScreens/CoordonateurConnexionScreen.js";
import EtudiantInscriptionScreen from "./screen/inscriptionScreens/etudiantInscriptionScreen.js";
import ExpertInscriptionScreen from "./screen/inscriptionScreens/ExpertConnexionScreen.js";
import JuryInscriptionScreen from "./screen/inscriptionScreens/JuryConnexionScreen.js";
import RectoratInscriptionScreen from "./screen/inscriptionScreens/RectoratConnexionScreen.js";
import EtudiantConnexionScreen from "./screen/inscriptionScreens/EtudiantConnexionScreen.js";
import DepartementConnexionScreen from "./screen/inscriptionScreens/DepartementConnexionScreen";
import Etudiant from "./screen/Etudiant";
import DepotDossierMaster from "./components/pageEtudiant/DepotDossierMaster";
import EvolutionDossier from "./components/pageEtudiant/EvolutionDossier"
import ProfilEtudiant from "./components/pageEtudiant/ProfilEtudiant";

import Soutenance from "./screen/Soutenance";
import Jury from "./screen/Jury";
import NotationMaster from "./components/pageJury/NotationMaster";
import ProfilJury from "./components/pageJury/ProfilJury";
import NotificationJury from "./components/pageJury/NotificationJury";
import TableList from "./components/pageJury/TableList";
import Expert from "./screen/Expert";
import NotationThese from "./components/pageExpert/NotationThese";
import ProfilExpert from "./components/pageExpert/ProfilExpert";
import DashboardExpert from "./components/pageExpert/dashBoardExpert"
import NotificationExpert from "./components/pageExpert/NotificationExpert"
import Departement from "./screen/Departement";
import ProfilDepartement from "./components/pageDepartement/ProfilDepartement";
import DashboardDepartement from "./components/pageDepartement/DashboardDepartement"
import NotificationDepartement from "./components/pageDepartement/NotificationDepartement";
import VerificationMaster from "./components/pageDepartement/VerificationMaster";*/
import Rectorat from "./screen/Rectorat";
import ProfilRectorat from "./components/pageRectorat/ProfilRectorat";
import DashboardRectorat from "./components/pageRectorat/DashboardRectorat"
import NotificationRectorat from "./components/pageRectorat/NotificationRectorat";
import Programmation from "./components/pageRectorat/Programmation";

/*import CandidatureScreen from "./screen/InfotmationScreens/CandidatureScreen";
import DocumentImportantScreen from "./screen/InfotmationScreens/DocumentImportantScreen";
import ConseilScientifiqueInscriptionScreen from "./screen/InfotmationScreens/ConseilScientifiqueScreen"*/

const App = () => {
  const isLogin = true;

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<Accueil isLogin={isLogin} />} />
          <Route path="/soutenance" element={<Soutenance isLogin={isLogin} />} />
          <Route path="/account" element={<Etudiant/>}>
            <Route path="/account/depot" element={<DepotDossierMaster/>}/>
            <Route path="/account/profil" element={<ProfilEtudiant/>}/>
            <Route path="/account/evolution" element={<EvolutionDossier/>}/>
         

          </Route>
          <Route path="/acteur/jury" element={<Jury />}>
            <Route path="/acteur/jury/dashboard" element={<DashboardExpert />} />
            <Route path="/acteur/jury/notation" element={<NotationMaster />} />
            <Route path="/acteur/jury/profil" element={<ProfilExpert />} />
            <Route
              path="/acteur/jury/notifications"
              element={<NotificationJury />}
            />
          </Route>
          <Route path="/acteur/expert" element={<Expert />}>
            <Route path="/acteur/expert/dashboard" element={<TableList />} />
            <Route path="/acteur/expert/notation" element={<NotationThese />} />
            <Route path="/acteur/expert/profil" element={<ProfilJury />} />
            <Route
              path="/acteur/expert/notifications"
              element={<NotificationExpert />}
            />
          </Route>
           <Route path="/acteur/departement" element={<Departement />}>
            <Route path="/acteur/departement/dashboard" element={<DashboardDepartement />} />
            <Route path="/acteur/departement/profil" element={<ProfilDepartement />} />
            <Route path="/acteur/departement/verification" element={<VerificationMaster />} />

            <Route
              path="/acteur/departement/notifications"
              element={<NotificationDepartement />}
            />
          </Route>*/}
          <Route path="/acteur/rectorat" element={<Rectorat />}>
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
          {/* <Route
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
          ></Route>
          */}
          {/* Routes qui concernent les information sur tous ce quil y'a a savoir sur les these et autres
          <Route path="/canditature" element={<CandidatureScreen />}></Route>
          <Route
            path="/conseil"
            element={<ConseilScientifiqueInscriptionScreen />}
          ></Route>
          <Route path="/document" element={<DocumentImportantScreen />}></Route> */}
          {/* <Route path="/equipe" element={<EquipeScreen />}></Route>
        <Route path="/formation" element={<FormationEnTheseScreen />}></Route>
        <Route path="/Inscription" element={<InscriptionScreen />}></Route>
        <Route path="/presentation" element={<Presentation />}></Route>
        <Route
          path="/Procedure"
          element={<ProceduredeSoutenanceScreen />}
        ></Route>
        <Route path="/Suivie" element={<SuivieDeFormation />}></Route>
        <Route
          path="/these-cotutelle"
          element={<TheseEnCotutelleScreen />}
        ></Route>
        <Route path="/these-cours" element={<TheseEnCoursScreen />}></Route>
        <Route
          path="/unites-recherche"
          element={<UnitesRechercheScreen />}
        ></Route> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
