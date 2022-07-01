const router = require('express').Router();
const controller = require('../controllers/coordonateur');
const { 
   isAdmin, isCoordonateur, getCoordonateur, 
   getEtudiantFromReq, getDossierFromReq,
   getCoordonateurFromParam
} = require('../middlewares');


router.route('').get(controller.getAll);

router.route('/moi').get(getCoordonateur, controller.getOne);

router.route('/register').post(isAdmin, controller.register_coordonateur);

router.route('/login').post(controller.login_coordonateur);

router.route('/change-password').put(
   isCoordonateur, 
   getCoordonateur, 
   controller.change_coordonator_pass
);

router.route('/change-email').put(isCoordonateur, getCoordonateur, controller.change_email);

router.route('/programmer-date-soutenance-master').put(
   isCoordonateur, 
   getEtudiantFromReq,
   getCoordonateur,
   controller.programmerDateSoutenanceMaster
);

router.route('/autorisations-soutenances-master').get(
   isCoordonateur, 
   controller.autorisationsSoutenanceMaster
);

router.route('/etudiants-masters-programmmes').get(
   isCoordonateur, 
   controller.etudiantsMasterProgrammes
);

router.route('/dossiers-etudiants-these').get(
   isCoordonateur, 
   getCoordonateur, 
   controller.dossiersEtudsThese
);

router.route('/notifications').get(isCoordonateur, getCoordonateur, controller.notifications);

router.route('/verifier-avis-donne').get(
   isCoordonateur, 
   getDossierFromReq, 
   getCoordonateur,
   controller.verifierAvisDonne
);

router.route('/donner-avis-admin').post(
   isCoordonateur, 
   getDossierFromReq, 
   getCoordonateur,
   controller.donnerAvisAdmin
);

router.route('/:id').get(getCoordonateurFromParam, controller.getOne)
.delete(isAdmin, controller.delete);


module.exports = router;

