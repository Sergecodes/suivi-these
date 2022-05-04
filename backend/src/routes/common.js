/* Routes communes a plusieurs acteurs */

const router = require('express').Router();
const controller = require('../controllers/common');


router.route('/logout').post(controller.logout);
router.route('/login').post(controller.login);


module.exports = router;

