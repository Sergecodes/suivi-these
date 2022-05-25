const router = require('express').Router();
const controller = require('../controllers/expert');


// router.route('/new-expert').post(controller.register_expert);

router.route('/login-expert').post(controller.login_expert);
router.route('/change_password/:id').put(controller.change_expert_pass);
router.route('/change_email').put(controller.change_email);


module.exports = router;

