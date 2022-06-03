const router = require('express').Router();
const controller = require('../controllers/etudiant');
const { isEtudiant, getEtudiantFromParam } = require('../middlewares')


router.route('/login-etudiant').post(controller.login_student);

router.route('/register-etudiant').post(controller.register);

router.route('/:id/change-email').put(isEtudiant, getEtudiantFromParam, controller.changeEmail);

router.route('/:id/change-password').put(isEtudiant, getEtudiantFromParam, controller.change_student_password);

router.route('/:id/change-phone-number').put(isEtudiant, getEtudiantFromParam, controller.changePhoneNumber)

router.route('/:id/uploader-fichiers').put(isEtudiant, getEtudiantFromParam, controller.uploadFiles);

router.route('/:id/update-photo').put(isEtudiant, getEtudiantFromParam, controller.updatePhoto)

router.route('/dates-soutenance').get(controller.datesSoutenance);

router.route('/:id/etapes-dossier').get(isEtudiant, getEtudiantFromParam, controller.etapesDossier);

router.route('/:id/peut-uploader').get(isEtudiant, getEtudiantFromParam, controller.peutUploaderDossier);

router.route('/reinitialiser').put(isEtudiant, getEtudiantFromParam, controller.reinitialiser);


module.exports = router;

