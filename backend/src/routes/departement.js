const router = require('express').Router();
const controller = require('../controllers/departement');
const { isAdmin } = require('../middlewares');


router.route('/register-departement').post(isAdmin, controller.register_departement)

router.route('/login-department').post(controller.login_departement);


module.exports = router;

