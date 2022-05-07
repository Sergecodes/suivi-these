const router = require('express').Router();
const controller = require('../controllers/admin');


router.route('/login-admin').post(controller.login_admin);


module.exports = router;

