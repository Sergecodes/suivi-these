const router = require('express').Router();
const controller = require('../controllers/etudiant');


router.route('/login-etudiant').post(controller.login_student);

router.route('/register-etudiant').post(controller.register)

router.route('/etudiant/password/:id').put(controller.change_student_password)

router.route('/phone/:id').put(controller.changePhoneNumber)


module.exports = router;

