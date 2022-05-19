const router = require('express').Router();
const controller = require('../controllers/uniteRecherche');


router.route('/new-unite').post(controller.register_unite);


module.exports = router;

