const router = require('express').Router();
const controller = require('../controllers/coordonateur');
const { 
   isAdmin, isCoordonateur, getCoordonateur, 
   getEtudiantFromReq, getDossierFromReq,
   getCoordonateurFromParam
} = require('../middlewares');


router.route('').get(controller.getAll);

router.route('/moi').get(getCoordonateur, controller.getOne);

router.route('/:id').get(getCoordonateurFromParam, controller.getOne).delete(controller.delete);

router.route('/register').post(isAdmin, controller.register_coordonateur);

router.route('/login').post(controller.login_coordonateur);

router.route('/change-password').put(
   isCoordonateur, 
   getCoordonateur, 
   controller.change_coordonator_pass
);

router.route('/change-email').put(isCoordonateur, getCoordonateur, controller.change_email);

router.route('/programmer-date-soutenance-master').post(
   isCoordonateur, 
   getEtudiantFromReq,
   getCoordonateur,
   controller.programmerDateSoutenanceMaster
);

router.route('/autorisations-soutenances-master').get(
   isCoordonateur, 
   getCoordonateur, 
   controller.autorisationsSoutenanceMaster
);

// router.route('/rapports-etudiants-these').get(isCoordonateur, controller.rapportsEtudsThese);

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


module.exports = router;

