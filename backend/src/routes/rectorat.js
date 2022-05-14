const router = require('express').Router();
const controller = require('../controllers/rectorat');
const { isRectorat } = require('../middlewares');


router.route('/login-rectorat').post(controller.login_rectorat);

router.route('/notifications').get(isRectorat, controller.notifications);

router.route('/change-password').put(isRectorat, controller.changePassword);

router.route('/change-email').put(isRectorat, controller.changeEmail);

router.route('/rapports-etudiants').get(isRectorat, controller.rapportsEtudsThese);

router.route('/programmer-date-soutenance').post(isRectorat, controller.programmerDateSoutenance);


module.exports = router;

