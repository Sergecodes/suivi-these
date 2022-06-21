const router = require('express').Router();
const controller = require('../controllers/jury');
const { 
   isAdmin, isJury, getJury, 
   getDossierFromReq, getJuryFromParam 
} = require('../middlewares');


router.route('').get(controller.getAll);

router.route('/moi').get(getJury, controller.getOne);

router.route('/register').post(isAdmin, controller.register_jury);

router.route('/login').post(controller.login_jury);

router.route('/change-email').put(isJury, getJury, controller.change_email);

router.route('/dossiers-etudiants-master').get(isJury, getJury, controller.dossiersEtudsMaster);

router.route('/noter-dossier').post(isJury, getDossierFromReq, getJury, controller.noterDossier);

router.route('/verifier-dossier-note').get(
   isJury, 
   getDossierFromReq, 
   getJury, 
   controller.verifierNoterDossier
);

router.route('/notifications').get(isJury, getJury, controller.notifications);

router.route('/change-password').put(isJury, getJury, controller.change_jury_pass);

router.route('/change-number').put(isJury, getJury, controller.changePhoneNumber);

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

router.route('/:id').get(getJuryFromParam, controller.getOne).delete(controller.delete);


module.exports = router;