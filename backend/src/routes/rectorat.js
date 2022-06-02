const router = require('express').Router();
const controller = require('../controllers/rectorat');
const { 
   isRectorat, 
   getRectorat, 
   getEtudiantFromReq, 
   getDossierFromReq 
} = require('../middlewares');


router.route('/login-rectorat').post(controller.login_rectorat);

router.route('/register-rectorat').post(controller.register_rectorat);

router.route('/notifications').get(isRectorat, controller.notifications);

router.route('/change-password').put(isRectorat, controller.changePassword);

router.route('/change-email').put(isRectorat, controller.changeEmail);

router.route('/programmer-date-soutenance-these').post(
   isRectorat, 
   getEtudiantFromReq,
   getCoordonateur,
   controller.programmerDateSoutenanceThese
);


router.route('/dossiers-etudiants-these').get(
   isRectorat, 
   getRectorat, 
   controller.dossiersEtudsThese
);

router.route('/verifier-avis-donne').get(
   isRectorat, 
   getDossierFromReq, 
   getRectorat,
   controller.verifierAvisDonne
);

router.route('/donner-avis-admin').post(
   isRectorat, 
   getDossierFromReq, 
   getRectorat,
   controller.donnerAvisAdmin
);


module.exports = router;

