/* Routes communes a plusieurs acteurs */

const router = require('express').Router();
const controller = require('../controllers/common');
const { isLoggedIn } = require('../middlewares');


router.route('/logout').post(controller.logout);

router.route('/envoyer-dossier').post(isLoggedIn, controller.envoyerDossier);

router.route('/dossiers-envoyes').get(isLoggedIn, controller.dossiersEnvoyes);

router.route('/donner-avis').post(isLoggedIn, controller.donnerAvis);

router.route('/avis-donnes').get(isLoggedin, controller.avisDonnes);


module.exports = router;

