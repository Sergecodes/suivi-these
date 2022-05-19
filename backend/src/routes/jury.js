const router = require('express').Router();
const controller = require('../controllers/jury');
const { isAdmin, isJury, getJuryAndDossier } = require('../middlewares');


router.route('/register-jury').post(isAdmin, controller.register_jury);

router.route('/login-jury').post(controller.login_jury);

router.route('/change_password/:id').post(controller.change_jury_pass);

router.route('/rapports-etudiants').get(isJury, controller.rapportsEtudsMaster);

router.route('/noter-dossier').post(isJury, getJuryAndDossier, controller.noterDossier);

router.route('/verifier-dossier-note').get(isJury, getJuryAndDossier, controller.verifierNoterDossier);

router.route('/notifications').get(isJury, controller.notifications);

router.route('/change-password').put(isJury, controller.changePassword);

router.route('/change-number').put(isJury, controller.changePhoneNumber);

// router.route('/verifier-avis-donne').get(isJury, getJuryAndDossier, controller.verifierAvisDonne);

// router.route('/donner-avis-admin').post(isJury, getJuryAndDossier, controller.donnerAvisAdmin);


module.exports = router;

