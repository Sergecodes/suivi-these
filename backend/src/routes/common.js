/* Routes communes a plusieurs acteurs */

const router = require('express').Router();
const controller = require('../controllers/common');
const { isLoggedIn } = require('../middlewares');


router.route('/logout').post(controller.logout);

router.route('/envoyer-dossier').post(isLoggedIn, controller.envoyerDossier);


module.exports = router;

