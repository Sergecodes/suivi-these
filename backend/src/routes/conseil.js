const router = require('express').Router();
const controller = require('../controllers/conseil');


router.route('/new-conseil').post(controller.new_conseil);

router.route('/login-conseil').post(controller.conseil_login);


module.exports = router;

