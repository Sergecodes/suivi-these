const router = require('express').Router();
const controller = require('../controllers/rectorat');


router.route('/login-rectorat').post(controller.login_rectorat);


module.exports = router;

