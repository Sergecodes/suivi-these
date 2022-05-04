const router = require('express').Router();
const controller = require('../controllers/jury');


router.route('/register-jury').post(controller.register_jury);

router.route('/login-jury').post(controller.login_jury);


module.exports = router;

