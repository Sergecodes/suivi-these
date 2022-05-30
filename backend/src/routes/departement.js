const router = require('express').Router();
const controller = require('../controllers/departement');
const { isAdmin, isDepartement, getDepartAndDossier } = require('../middlewares');


router.route('/register-departement').post(isAdmin, controller.register_departement)

router.route('/login-department').post(controller.login_departement);

router.route('/change_password/:id').put(controller.change_departement_pass);

router.route('/change_email').put(controller.change_email);

router.route('/notifications').get(isDepartement, controller.notifications);

router.route('/dossiers-etudiants-master').get(isDepartement, controller.dossiersEtudsMaster);

router.route('/valider-dossier').get(isDepartement, controller.validerDossier);

router.route('/rejeter-dossier').get(isDepartement, controller.rejeterDossier);

router.route('/verifier-avis-donne').get(isDepartement, getDepartAndDossier, controller.verifierAvisDonne);

router.route('/donner-avis-admin').post(isDepartement, getDepartAndDossier, controller.donnerAvisAdmin);




module.exports = router;

