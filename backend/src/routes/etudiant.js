const router = require('express').Router();
const controller = require('../controllers/etudiant');


router.route('/login-etudiant').post(controller.login_student);

router.route('/register-etudiant').post(controller.register)

router.route('/etudiant/password/:id').put(controller.change_student_password)

router.route('/phone/:id').put(controller.changePhoneNumber)

router.route('/uploader-fichiers').post(controller.uploadFiles);

router.route('/date_soutenance').get(controller.sort_dateSoutenance_by2Date);


module.exports = router;

