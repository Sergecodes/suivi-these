const router = require('express').Router();
const controller = require('../controllers/coordonateur');
const { isAdmin } = require('../middlewares');


router.route('/register-coord').post(isAdmin, controller.register_coordonateur);

router.route('/login-coord').post(controller.login_coordonateur);


module.exports = router;

