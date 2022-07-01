import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "antd/dist/antd.min.css";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "react-toastify/dist/ReactToastify.css";
import 'moment/locale/fr';
import { Result } from "antd"

/*************************************page accueil************************************/
import Accueil from "./screen/Accueil";
/**************************************************************************************************/

/*************************************page soutenance************************************/
import Soutenance from "./screen/Soutenance";
/**************************************************************************************************/

/********************************************page info ecole doctorale*********************************/
import CandidatureScreen from "./screen/InfotmationScreens/CandidatureScreen";
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
import ConseilScientifiqueScreen from "./screen/InfotmationScreens/ConseilScientifiqueScreen";

/**************************************************************************************************/

/*************************************pages inscription et connexion************************************/
import AdminInscriptionScreen from "./screen/inscriptionScreens/AdminConnexionScreen.js";
import ConseilScientifiqueInscriptionScreen from "./screen/inscriptionScreens/ConseilScientifiqueConnexionScreen.js";
import CoordonateurInscriptionScreen from "./screen/inscriptionScreens/CoordonateurConnexionScreen.js";
import EtudiantInscriptionScreen from "./screen/inscriptionScreens/etudiantInscriptionScreen.js";
import ExpertInscriptionScreen from "./screen/inscriptionScreens/ExpertConnexionScreen.js";
import JuryInscriptionScreen from "./screen/inscriptionScreens/JuryConnexionScreen.js";
import RectoratInscriptionScreen from "./screen/inscriptionScreens/RectoratConnexionScreen.js";
import EtudiantConnexionScreen from "./screen/inscriptionScreens/EtudiantConnexionScreen.js";
import DepartementConnexionScreen from "./screen/inscriptionScreens/DepartementConnexionScreen";
/**************************************************************************************************/

/************************************************page etudiant************************************/
import Etudiant from "./screen/Etudiant";
import DepotDossierMaster from "./components/pageEtudiant/DepotDossierMaster";
import EvolutionDossier from "./components/pageEtudiant/EvolutionDossier";
import ProfilEtudiant from "./components/pageEtudiant/ProfilEtudiant";
/**************************************************************************************************/

/************************************************page expert************************************/
import Expert from "./screen/Expert";
import NotationThese from "./components/pageExpert/NotationThese";
import ProfilExpert from "./components/pageExpert/ProfilExpert";
import DashboardExpert from "./components/pageExpert/dashBoardExpert";
import NotificationExpert from "./components/pageExpert/NotificationExpert";
/**************************************************************************************************/

/************************************************page departement************************************/
import Departement from "./screen/Departement";
import ProfilDepartement from "./components/pageDepartement/ProfilDepartement";
import DashboardDepartement from "./components/pageDepartement/DashboardDepartement";
import NotificationDepartement from "./components/pageDepartement/NotificationDepartement";
import VerificationMaster from "./components/pageDepartement/VerificationMaster";
/**************************************************************************************************/

/************************************************page rectorat************************************/
import Rectorat from "./screen/Rectorat";
import ProfilRectorat from "./components/pageRectorat/ProfilRectorat";
import DashboardRectorat from "./components/pageRectorat/DashboardRectorat";
import NotificationRectorat from "./components/pageRectorat/NotificationRectorat";
import Programmation from "./components/pageRectorat/Programmation";
/**************************************************************************************************/

/************************************************page jury************************************/
import Jury from "./screen/Jury";
import NotationMaster from "./components/pageJury/NotationMaster";
import ProfilJury from "./components/pageJury/ProfilJury";
import NotificationJury from "./components/pageJury/NotificationJury";
import DashboardJury from "./components/pageJury/DashboardJury";
/**************************************************************************************************/

/************************************************page coordonateur************************************/
import Coordonateur from "./screen/Coordonateur";
import DashboardCoordo from "./components/pageCoordonateur/DashboardCoordo";
import ProfilCoordonateur from "./components/pageCoordonateur/ProfilCoordonateur";
import RapportAudition from "./components/pageCoordonateur/These/RapportAudition";
import RedactionRapport from "./components/pageCoordonateur/These/RedactionRapport";
import DossierThese from "./components/pageCoordonateur/These/DossierThese";
import AutorisationDeSoutenance from "./components/pageCoordonateur/Master/AutorisationDeSoutenance";
import DatesProgrammees from "./components/pageCoordonateur/Master/DatesProgrammees";
import NotificationCoordonateur from "./components/pageCoordonateur/NotificationCoordonateur";
import RapportAdminMaster from "./components/pageCoordonateur/Master/RapportAdminMaster";
import DateDeSoutenance from "./components/pageCoordonateur/Master/DateDeSoutenance";
    /***************************************************************************************************/

    /************************************************page admin************************************/
    import Admin from "./screen/Admin";
    import DashboardAdmin from "./components/pageAdmin/DashboardAdmin";
    import ListeAttente from "./components/pageAdmin/ListeAttente";
    import ListeEtudiants from "./components/pageAdmin/ListeEtudiants";
    import NoteLecture from "./components/pageAdmin/NoteLecture";
    import DetailsNotation from "./components/pageAdmin/Autorisation/DetailsNotation";
    import RapportSoutenance from "./components/pageAdmin/Autorisation/RapportSoutenance";
    import ListeJury from "./components/pageAdmin/Liste/ListeJury";
    import ListeDepartement from "./components/pageAdmin/Liste/ListeDepartement";
    import ListeCoordo from "./components/pageAdmin/Liste/ListeCoordo";
    import ListeConseil from "./components/pageAdmin/Liste/ListeConseil"; 
    import ListeExpert from "./components/pageAdmin/Liste/ListeExpert";
    import ListeRectorat from "./components/pageAdmin/Liste/ListeRectorat";
    import NotificationsAdmin from "./components/pageAdmin/NotificationsAdmin";
    import ProfilAdmin from "./components/pageAdmin/ProfilAdmin";
    import RapportExpertise from "./components/pageAdmin/Rapports/RapportExpertise/RapportExpertise"
    /**************************************************************************************************/

/**************************************************************************************************/

// Configurer les options par defaut d'axios
import axios from "axios";

axios.defaults.baseURL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8001/api";
axios.defaults.withCredentials = true;

const App = () => {
  document.title = "Ecole Doctorale STG";

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Accueil  />} />
          <Route
            path="/soutenances"
            element={<Soutenance />}
          />

          {/**
           *  */}
          <Route path="/account" element={<Etudiant />}>
            <Route path="/account/depot" element={<DepotDossierMaster />} />
            <Route path="/account/profil" element={<ProfilEtudiant />} />
            <Route path="/account/evolution" element={<EvolutionDossier />} />
            <Route
              path="/account/changement-sujet"
              element={<Result title="En cours d'implémentation" />}
            />
            <Route
              path="/account/changement-encadreur"
              element={<Result title="En cours d'implémentation" />}
            />
          </Route>

          {/**/}
          <Route path="/acteur/jury" element={<Jury />}>
            <Route path="/acteur/jury/dashboard" element={<DashboardJury />} />
            <Route path="/acteur/jury/notation" element={<NotationMaster />} />
            <Route path="/acteur/jury/profil" element={<ProfilJury />} />
            <Route
              path="/acteur/jury/notifications"
              element={<NotificationJury />}
            />
          </Route>

          <Route path="/acteur/expert" element={<Expert />}>
            <Route
              path="/acteur/expert/dashboard"
              element={<DashboardExpert />}
            />
            <Route path="/acteur/expert/notation" element={<NotationThese />} />
            <Route path="/acteur/expert/profil" element={<ProfilExpert />} />
            <Route
              path="/acteur/expert/notifications"
              element={<NotificationExpert />}
            />
          </Route>

          <Route path="/acteur/departement" element={<Departement />}>
            <Route
              path="/acteur/departement/dashboard"
              element={<DashboardDepartement />}
            />
            <Route
              path="/acteur/departement/profil"
              element={<ProfilDepartement />}
            />
            <Route
              path="/acteur/departement/verification"
              element={<VerificationMaster />}
            />

            <Route
              path="/acteur/departement/notifications"
              element={<NotificationDepartement />}
            />
          </Route>

          <Route path="/acteur/rectorat" element={<Rectorat />}>
            <Route
              path="/acteur/rectorat/dashboard"
              element={<DashboardRectorat />}
            />
            <Route
              path="/acteur/rectorat/profil"
              element={<ProfilRectorat />}
            />

            <Route
              path="/acteur/rectorat/notifications"
              element={<NotificationRectorat />}
            />
            <Route
              path="/acteur/rectorat/programmation"
              element={<Programmation />}
            />
          </Route>
  
          <Route path="/acteur/admin" element={<Admin/>} >
                <Route path="/acteur/admin/dashboard" element={<DashboardAdmin />} />
                <Route path="/acteur/admin/liste-attente" element={<ListeAttente/>}/>
                <Route path="/acteur/admin/liste-etudiants" element={<ListeEtudiants/>}/>
                <Route path="/acteur/admin/notes-lecture" element={<NoteLecture/>}/>
                <Route path="/acteur/admin/detail-notation" element={<DetailsNotation/>}/>
                <Route path="/acteur/admin/rapport-soutenance" element={<RapportSoutenance/>}/>
                <Route path="/acteur/admin/liste-jury" element={<ListeJury/>}/>
                <Route path="/acteur/admin/liste-departement" element={<ListeDepartement/>}/>
                <Route path="/acteur/admin/liste-coordo" element={<ListeCoordo/>}/>
                <Route path="/acteur/admin/liste-conseil" element={<ListeConseil/>}/>
                <Route path="/acteur/admin/liste-rectorat" element={<ListeRectorat/>}/>
                <Route path="/acteur/admin/liste-expert" element={<ListeExpert/>}/>
                <Route path="/acteur/admin/profil" element={<ProfilAdmin/>}/>
                <Route path="/acteur/admin/notifications" element={<NotificationsAdmin/>}/>
                <Route path="/acteur/admin/rapport-expertise" element={<RapportExpertise/>}/>
           </Route>

          <Route
            path="/*"
            element={
              <div className="d-flex flex-column align-items-center text-align-center">
                <h1 style={{ color: "red" }}>ERROR !</h1>
                <h2 style={{ fontWeight: "none" }}>
                  Lien non existant ou non activé
                </h2>
              </div>
            }
          />

          {/* Routes pour les coordonateurs */}
          <Route path="/acteur/coordonateur" element={<Coordonateur />}>
            <Route
              path="/acteur/coordonateur/dashboard"
              element={<DashboardCoordo />}
            />
            <Route
              path="/acteur/coordonateur/audition"
              element={<RapportAudition />}
            />
             <Route
              path="/acteur/coordonateur/redaction-rapport"
              element={<RedactionRapport />}
            />
            <Route
              path="/acteur/coordonateur/dossier-these"
              element={<DossierThese />}
            />
            <Route
              path="/acteur/coordonateur/profil"
              element={<ProfilCoordonateur />}
            />
            <Route
              path="/acteur/coordonateur/autorisation"
              element={<AutorisationDeSoutenance />}
            />
            <Route
              path="/acteur/coordonateur/date"
              element={<DateDeSoutenance />}
            />
            <Route
              path="/acteur/coordonateur/date-programmees"
              element={<DatesProgrammees />}
            />
            <Route
              path="/acteur/coordonateur/notifications"
              element={<NotificationCoordonateur />}
            />
            <Route
              path="/acteur/coordonateur/rapport-master"
              element={<RapportAdminMaster />}
            />
          </Route>
          
            {/*-------------*/}

          <Route
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
            path="/connexion/jury"
            element={<JuryInscriptionScreen />}
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

          {/* Routes qui concernent les information sur tous ce quil y'a a savoir sur les these et autres*/}
          <Route path="/candidature" element={<CandidatureScreen />}></Route>
          <Route path="/document" element={<DocumentImportantScreen />}></Route>
          <Route path="/equipe" element={<EquipeScreen />}></Route>
          <Route path="/formation" element={<FormationEnTheseScreen />}></Route>
          <Route path="/Inscription" element={<InscriptionScreen />}></Route>
          <Route path="/presentation" element={<Presentation />}></Route>
          <Route path="/canditature" element={<CandidatureScreen />}></Route>
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
          ></Route>
          <Route
            path="/conseil"
            element={<ConseilScientifiqueScreen />}
          ></Route>
          <Route path="/document" element={<DocumentImportantScreen />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
