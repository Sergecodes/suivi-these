const router = require('express').Router();
const controller = require('../controllers/conseil');
const { isAdmin } = require('../middlewares')


router.route('/new-conseil').post(isAdmin, controller.new_conseil);

router.route('/login-conseil').post(controller.conseil_login);


module.exports = router;

