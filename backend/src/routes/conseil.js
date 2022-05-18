const router = require('express').Router();
const controller = require('../controllers/conseil');


// router.route('/new-conseil').post(controller.new_conseil);

router.route('/login-conseil').post(controller.conseil_login);
router.route('/change_password/:id').put(controller.change_conseil_pass);


module.exports = router;

