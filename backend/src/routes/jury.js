const router = require('express').Router();
const controller = require('../controllers/jury');
const { isAdmin, isJury, getJury, getDossierFromReq } = require('../middlewares');


router.route('/register-jury').post(isAdmin, controller.register_jury);

router.route('/login-jury').post(controller.login_jury);

router.route('/change_email').put(isJury, getJury, controller.change_email);

router.route('/dossiers-etudiants-master').get(isJury, getJury, controller.dossiersEtudsMaster);

router.route('/noter-dossier').post(isJury, getDossierFromReq, getJury, controller.noterDossier);

router.route('/verifier-dossier-note').get(
   isJury, 
   getDossierFromReq, 
   getJury, 
   controller.verifierNoterDossier
);

router.route('/notifications').get(isJury, controller.notifications);

router.route('/change-password').put(isJury, controller.change_jury_pass);

router.route('/change-number').put(isJury, controller.changePhoneNumber);

router.route('/verifier-avis-donne').get(
   isJury, 
   getDossierFromReq, 
   getJury, 
   controller.verifierAvisDonne
);

router.route('/donner-avis-admin').post(
   isJury, 
   getDossierFromReq, 
   getJury, 
   controller.donnerAvisAdmin
);


module.exports = router;