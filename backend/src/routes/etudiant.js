const router = require('express').Router();
const controller = require('../controllers/etudiant');
const { isEtudiant } = require('../middlewares')


router.route('/login-etudiant').post(controller.login_student);

router.route('/register-etudiant').post(controller.register)

router.route('/password/:id').put(isEtudiant, controller.change_student_password);

router.route('/phone/:matricule').put(isEtudiant, controller.changePhoneNumber)

router.route('/uploader-fichiers').post(controller.uploadFiles);

router.route('/update-photo').put(isEtudiant, controller.updatePhoto)

router.route('/dates-soutenance').get(controller.datesSoutenance);

router.route('/etapes-dossier').get(isEtudiant, controller.etapesDossier)


module.exports = router;

