const router = require('express').Router();
const controller = require('../controllers/expert');
const { 
   isAdmin, isExpert, getExpert, 
   getDossierFromReq, getExpertFromParam 
} = require('../middlewares');


router.route('').get(controller.getAll);

router.route('/moi').get(getExpert, controller.getOne);

router.route('/register').post(isAdmin, controller.register_expert);

router.route('/login').post(controller.login_expert);

router.route('/change-password').put(isExpert, getExpert, controller.change_expert_pass);

router.route('/change-email').put(isExpert, getExpert, controller.change_email);

router.route('/change-phone-number').put(isExpert, getExpert, controller.changePhoneNumber);

router.route('/dossiers-etudiants-these').get(isExpert, getExpert, controller.dossiersEtudsThese);

router.route('/notifications').get(isExpert, getExpert, controller.notifications);

router.route('/verifier-avis-donne').get(
   isExpert, 
   getDossierFromReq, 
   getExpert, 
   controller.verifierAvisDonne
);

router.route('/donner-avis-admin').post(
   isExpert, 
   getDossierFromReq, 
   getExpert, 
   controller.donnerAvisAdmin
);

router.route('/:id').get(getExpertFromParam, controller.getOne)
.delete(isAdmin, controller.delete);


module.exports = router;

