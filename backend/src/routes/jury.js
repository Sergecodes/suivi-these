const router = require('express').Router();
const controller = require('../controllers/jury');


// router.route('/register-jury').post(controller.register_jury);

router.route('/login-jury').post(controller.login_jury);
router.route('/change_password/:id').put(controller.change_jury_pass);
router.route('/change_email').put(controller.change_email);


module.exports = router;

