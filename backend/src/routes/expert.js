const router = require('express').Router();
const controller = require('../controllers/expert');
const { isAdmin } = require('../middlewares');


router.route('/new-expert').post(isAdmin, controller.register_expert);

router.route('/login-expert').post(controller.login_expert);


module.exports = router;

