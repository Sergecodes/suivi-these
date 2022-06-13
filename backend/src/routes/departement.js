const router = require('express').Router();
const controller = require('../controllers/departement');
const { isAdmin, isDepartement, getDepartement, getDossierFromReq } = require('../middlewares');


router.route('/register-departement').post(isAdmin, controller.register_departement)

router.route('/login-department').post(controller.login_departement);

router.route('/change_password').put(
   isDepartement, 
   getDepartement,
   controller.change_departement_pass
);

router.route('/change_email').put(
   isDepartement,
   getDepartement,
   controller.change_email
);

router.route('/notifications').get(isDepartement, getDepartement, controller.notifications);

router.route('/dossiers-etudiants-master').get(isDepartement, controller.dossiersEtudsMaster);

router.route('/valider-dossier').get(isDepartement, controller.validerDossier);

router.route('/rejeter-dossier').get(isDepartement, controller.rejeterDossier);

router.route('/verifier-avis-donne').get(
   isDepartement, 
   getDossierFromReq,
   getDepartement, 
   controller.verifierAvisDonne
);

router.route('/donner-avis-admin').post(
   isDepartement, 
   getDossierFromReq,
   getDepartement, 
   controller.donnerAvisAdmin
);




module.exports = router;

