const router = require('express').Router();
const controller = require('../controllers/expert');


router.route('/new-expert').post(controller.register_expert);

router.route('/login-expert').post(controller.login_expert);


module.exports = router;

