const router = require('express').Router();
const controller = require('../controllers/jury');


// router.route('/register-jury').post(controller.register_jury);

router.route('/login-jury').post(controller.login_jury);
router.route('/change_password/:id').post(controller.change_jury_pass);


module.exports = router;

