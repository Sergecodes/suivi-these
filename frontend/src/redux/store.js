import { configureStore } from "@reduxjs/toolkit";
import MasterFilesUploadSlice from "./MasterFilesUploadSlice";
import TheseFilesUploadSlice from "./TheseFilesUploadSlice";
import DashboardDisplaySlice from "./DashboardDisplaySlice";
import authReducer from "./authentification/authSlice";
import authJurySlice from "./authentification/authJurySlice";
import authAdminSlice from "./authentification/authAdminSlice";
import authConseillerSlice from "./authentification/authConseillerSlice";
import authExpertSlice from "./authentification/authExpertSlice";
import authRectoratSlice from "./authentification/authRectoratSlice";
import authDepartementSlice from "./authentification/authDepartementSlice";
import authCoordonateurSlice from "./authentification/authCoordonateurSlice";
import autEtudiantInscriptionSlice from "./authentification/autEtudiantInscriptionSlice";
import getNotificationSlice from "./CooordonateurManagmentSllice";
import changeEmailCoordonateur  from "./coordonateur/ChangePasswordCoordoSlice";

export default configureStore({
  reducer: {
    masterFilesUpload: MasterFilesUploadSlice,
    theseFilesUpload: TheseFilesUploadSlice,
    dashboardDisplay: DashboardDisplaySlice,
    auth: authReducer,
    authJury: authJurySlice,
    authAdmin: authAdminSlice,
    authConseiller: authConseillerSlice,
    authExpert: authExpertSlice,
    authRectorat: authRectoratSlice,
    authDepartement: authDepartementSlice,
    registerEtudiant: autEtudiantInscriptionSlice,
    authCoordonateur: authCoordonateurSlice,
    notificationCoordonateur:getNotificationSlice,
    changePasswordCoordonateur:changeEmailCoordonateur,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
 