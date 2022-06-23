const router = require('express').Router();
const controller = require('../controllers/conseil');
const { 
   isAdmin, isConseil, getConseil, 
   getDossierFromReq, getConseilFromParam 
} = require('../middlewares')


router.route('').get(controller.getAll);

router.route('/moi').get(getConseil, controller.getOne);

router.route('/register').post(isAdmin, controller.new_conseil);

router.route('/login').post(controller.conseil_login);

router.route('/change-password').put(isConseil, getConseil, controller.change_conseil_pass);

router.route('/change-email').put(isConseil, getConseil, controller.change_email);

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

router.route('/:id').get(getConseilFromParam, controller.getOne).delete(controller.delete);


module.exports = router;

