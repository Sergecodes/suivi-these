const router = require('express').Router();
const controller = require('../controllers/coordonateur');
const { isAdmin, isCoordonateur } = require('../middlewares');


router.route('/register-coord').post(isAdmin, controller.register_coordonateur);

router.route('/login-coord').post(controller.login_coordonateur);

router.route('/programmer-date-soutenance-master').post(isCoordonateur, controller.programmerDateSoutenanceMaster);

router.route('/autorisations-soutenances-master').get(isCoordonateur, controller.autorisationsSoutenanceMaster);

router.route('/rapports-etudiants-these').get(isCoordonateur, controller.rapportsEtudsThese);

router.route('/notifications').get(isCoordonateur, controller.notifications);

router.route('/verifier-avis-donne').get(isCoordonateur, controller.verifierAvisDonne);

router.route('/donner-avis-admin').post(isCoordonateur, controller.donnerAvisAdmin);

// router.route('/change-password').put(isCoordonateur, controller.changePassword);

router.route('/change_password/:coordonator_id').put(controller.change_coordonator_pass);



module.exports = router;

