const router = require('express').Router();
const controller = require('../controllers/departement');
const { 
   isAdmin, isDepartement, getDepartement, 
   getDossierFromReq, getDepartementFromParam 
} = require('../middlewares');


router.route('').get(controller.getAll);

router.route('/moi').get(getDepartement, controller.getOne);

router.route('/register').post(isAdmin, controller.register_departement)

router.route('/login').post(controller.login_departement);

router.route('/change-password').put(
   isDepartement, 
   getDepartement,
   controller.change_departement_pass
);

router.route('/change-email').put(
   isDepartement,
   getDepartement,
   controller.change_email
);

router.route('/notifications').get(isDepartement, getDepartement, controller.notifications);

router.route('/dossiers-etudiants-master').get(
   isDepartement,
   getDepartement, 
   controller.dossiersEtudsMaster
);

router.route('/valider-dossier').get(
   isDepartement, 
   getDossierFromReq,
   getDepartement,
   controller.validerDossier
);

router.route('/rejeter-dossier').get(
   isDepartement, 
   getDossierFromReq,
   getDepartement,
   controller.rejeterDossier
);

router.route('/verifier-avis-donne').get(
   isDepartement, 
   getDossierFromReq,
   getDepartement, 
   controller.verifierAvisDonne
);

router.route('/donner-avis-admin').post(
   isDepartement, 
   getDossierFromReq,
   getDepartement, 
   controller.donnerAvisAdmin
);

router.route('/:id/juries').get(controller.getJuries);

router.route('/:id').get(getDepartementFromParam, controller.getOne).delete(controller.delete);



module.exports = router;

