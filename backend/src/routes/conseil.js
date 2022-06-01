const router = require('express').Router();
const controller = require('../controllers/conseil');
const { isAdmin } = require('../middlewares')


router.route('/new-conseil').post(isAdmin, controller.new_conseil);

router.route('/login-conseil').post(controller.conseil_login);

router.route('/change_password/:id').put(controller.change_conseil_pass);

router.route('/change_email').put(controller.change_email);


module.exports = router;

