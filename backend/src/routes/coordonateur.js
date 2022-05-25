const router = require('express').Router();
const controller = require('../controllers/coordonateur');


// router.route('/register-coord').post(controller.register_coordonateur);

router.route('/login-coord').post(controller.login_coordonateur);
router.route('/change_password/:coordonator_id').put(controller.change_coordonator_pass);
router.route('/change_email').put(controller.change_email);


module.exports = router;

