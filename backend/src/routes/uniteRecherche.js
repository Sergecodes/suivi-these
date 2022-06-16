const router = require('express').Router();
const controller = require('../controllers/uniteRecherche');


router.route('/register').post(controller.register_unite);


module.exports = router;

