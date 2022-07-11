const router = require('express').Router();
const controller = require('../controllers/departement');
const { 
   isAdmin, isDepartement, getDepartement, 
   getDossierFromReq, getDepartementFromParam,
   getDossierFromParam
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

router.route('/update-profile').put(isDepartement, getDepartement, controller.updateProfile);

router.route('/notifications').get(isDepartement, getDepartement, controller.notifications);

router.route('/dossiers-etudiants-master').get(
   isDepartement,
   getDepartement, 
   controller.dossiersEtudsMaster
);

router.route('/dossiers/:id/valider').put(
   isDepartement, 
   getDossierFromParam,
   getDepartement,
   controller.validerDossier
);

router.route('/dossiers/:id/rejeter').put(
   isDepartement, 
   getDossierFromParam,
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

router.route('/:id').get(getDepartementFromParam, controller.getOne)
.delete(isAdmin, controller.delete);



module.exports = router;

