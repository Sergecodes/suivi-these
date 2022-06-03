const router = require('express').Router();
const controller = require('../controllers/etudiant');
const { isEtudiant, getEtudiantFromReq, getDossierFromReq } = require('../middlewares')


router.route('/login-etudiant').post(controller.login_student);

router.route('/register-etudiant').post(controller.register)

router.route('/change-password').put(isEtudiant, getEtudiantFromReq, controller.change_student_password);

router.route('/change-phone-number').put(isEtudiant, getEtudiantFromReq, controller.changePhoneNumber)

router.route('/uploader-fichiers').post(isEtudiant, getEtudiantFromReq, controller.uploadFiles);

router.route('/update-photo').put(isEtudiant, getEtudiantFromReq, controller.updatePhoto)

router.route('/dates-soutenance').get(controller.datesSoutenance);

router.route('/etapes-dossier').get(isEtudiant, getDossierFromReq, controller.etapesDossier);

router.route('/peut-uploader').get(isEtudiant, getEtudiantFromReq, controller.peutUploaderDossier);

// router.route('/reinitialiser').put(isEtudiant, getEtudiantFromReq, controller.reinitialiser);


module.exports = router;

