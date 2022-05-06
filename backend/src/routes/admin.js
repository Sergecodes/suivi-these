const router = require('express').Router();
const controller = require('../controllers/admin');


// router.route('/new-expert').post(controller.register_expert);

// router.route('/login-expert').post(controller.login_student);

 router.route('/add_coordonator').post(controller.register_coordonateur);


module.exports = router;

