const router = require('express').Router();
const controller = require('../controllers/etudiant');
const { isEtudiant, getEtudiant, getEtudiantFromParam } = require('../middlewares')


router.route('').get(controller.getAll);

router.route('/moi').get(getEtudiant, controller.getOne);

router.route('/login').post(controller.login_student);

router.route('/register').post(controller.register);

router.route('/notifications').get(isEtudiant, getEtudiant, controller.notifications);

router.route('/dates-soutenance').get(controller.datesSoutenance);

router.route('/change-email').put(isEtudiant, getEtudiant, controller.changeEmail);

router.route('/change-password').put(isEtudiant, getEtudiant, controller.change_student_password);

router.route('/change-phone-number').put(isEtudiant, getEtudiant, controller.changePhoneNumber);

router.route('/uploader-fichiers').put(isEtudiant, getEtudiant, controller.uploadFiles);

router.route('/update-photo').put(isEtudiant, getEtudiant, controller.updatePhoto)

router.route('/etapes-dossier').get(isEtudiant, getEtudiant, controller.etapesDossier);

router.route('/peut-uploader').get(isEtudiant, getEtudiant, controller.peutUploaderDossier);

router.route('/reinitialiser').put(isEtudiant, getEtudiant, controller.reinitialiser);

router.route('/:id/set-juges').put(getEtudiantFromParam, controller.setJuges);

router.route('/:id').get(getEtudiantFromParam, controller.getOne).delete(controller.delete);


module.exports = router;

