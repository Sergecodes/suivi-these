const router = require('express').Router();
const controller = require('../controllers/jury');
const { isAdmin, isJury } = require('../middlewares');


router.route('/register-jury').post(isAdmin, controller.register_jury);

router.route('/login-jury').post(controller.login_jury);

router.route('/rapports-etudiants').get(isJury, controller.rapportsEtudsMaster);

router.route('/noter-etudiant').post(isJury, controller.noterEtudiant);

router.route('/verifier-etudiant-note').get(isJury, controller.verifierNoterEtudiant);

router.route('/notifications').get(isJury, controller.notifications);

router.route('/change-password').put(isJury, controller.changePassword);

router.route('/change-number').put(isJury, controller.changePhoneNumber);

router.route('/verifier-avis-donne').get(isJury, controller.verifierAvisDonne);

router.route('/donner-avis-admin').post(isJury, controller.donnerAvisAdmin);


module.exports = router;

