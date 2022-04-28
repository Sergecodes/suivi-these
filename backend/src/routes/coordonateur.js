const router = require('express').Router();
const controller = require('../controllers/coordonateur');


router.route('/register-coord').post(controller.register_coordonateur);

router.route('/login-coord').post(controller.login_coordonateur);


module.exports = router;

