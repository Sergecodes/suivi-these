const router = require('express').Router();
const controller = require('../controllers/departement');


router.route('/register-departement').post(controller.register_departement)

router.route('/login-department').post(controller.login_departement);
router.route('/change_paasword/:id').put(controller.change_departement_pass);


module.exports = router;

