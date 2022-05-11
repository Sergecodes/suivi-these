const router = require('express').Router();
const controller = require('../controllers/jury');
const { isAdmin } = require('../middlewares');


router.route('/register-jury').post(isAdmin, controller.register_jury);

router.route('/login-jury').post(controller.login_jury);


module.exports = router;

