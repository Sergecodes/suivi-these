const router = require('express').Router();
const controller = require('../controllers/etudiant');
const { isEtudiant } = require('../middlewares')


router.route('/login-etudiant').post(controller.login_student);

router.route('/register-etudiant').post(controller.register)

router.route('/change-password').put(isEtudiant, controller.change_student_password);

router.route('/change-phone-number').put(isEtudiant, controller.changePhoneNumber)

router.route('/uploader-fichiers').post(isEtudiant, controller.uploadFiles);

router.route('/update-photo').put(isEtudiant, controller.updatePhoto)

router.route('/dates-soutenance').get(controller.datesSoutenance);

router.route('/etapes-dossier').get(isEtudiant, controller.etapesDossier);

router.route('/check-dossier').get(isEtudiant, controller.checkUploaderDossier);


module.exports = router;

