const router = require('express').Router();
const controller = require('../controllers/conseil');
const { isAdmin, isConseil, getConseil, getDossierFromReq } = require('../middlewares')


router.route('/new-conseil').post(isAdmin, controller.new_conseil);

router.route('/login-conseil').post(controller.conseil_login);

router.route('/change_password').put(isConseil, getConseil, controller.change_conseil_pass);

router.route('/change_email').put(isConseil, getConseil, controller.change_email);

router.route('/notifications').get(isConseil, getConseil, controller.notifications);

router.route('/dossiers-etudiants-these').get(
   isConseil, 
   getConseil, 
   controller.dossiersEtudsThese
);

router.route('/verifier-avis-donne').get(
   isConseil, 
   getDossierFromReq, 
   getConseil,
   controller.verifierAvisDonne
);

router.route('/donner-avis-admin').post(
   isConseil, 
   getDossierFromReq, 
   getConseil,
   controller.donnerAvisAdmin
);


module.exports = router;

