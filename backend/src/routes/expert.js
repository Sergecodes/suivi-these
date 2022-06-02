const router = require('express').Router();
const controller = require('../controllers/expert');
const { isAdmin, isExpert, getExpert, getDossierFromReq } = require('../middlewares');


router.route('/new-expert').post(isAdmin, controller.register_expert);

router.route('/login-expert').post(controller.login_expert);

router.route('/change_password/:id').put(controller.change_expert_pass);

router.route('/change_email').put(controller.change_email);

router.route('/dossiers-etudiants-these').get(isExpert, controller.dossiersEtudsThese);

router.route('/notifications').get(isExpert, controller.notifications);

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


module.exports = router;

