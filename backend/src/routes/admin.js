const router = require('express').Router();
const controller = require('../controllers/admin');
const { isAdmin, getAdmin, getAdminFromParam } = require('../middlewares');


router.route('').get(controller.getAll);

router.route('/moi').get(getAdmin, controller.getOne);

router.route('/login').post(controller.login);

router.route('/register').post(controller.register);

router.route('/:id').get(getAdminFromParam, controller.getOne).delete(controller.delete);


// router.route('/add_coordonator').post(isAdmin,controller.register_coordonateur);
// router.route('/delete_coordonator/:coord_id').delete(isAdmin,controller.deleteCoordonator);
// router.route('/add_jury').post(isAdmin,controller.add_jury);
// router.route('/delete_jury/:jury_id').delete(isAdmin,controller.deleteJury);
// router.route('/add_conseil').post(isAdmin,controller.add_conseil);
// router.route('/delete_conseil/:conseil_id').delete(isAdmin,controller.deleteConseil);
// router.route('add_expert').post(isAdmin,controller.add_expert);
// router.route('delete_expert/:expert_id').delete(isAdmin,controller.deleteExpert);
// router.route('reject_student').post(isAdmin,controller.rejetD1Etudiant);
// router.route('reject_student_doc').post(isAdmin,controller.rejetD1Dossier);

 module.exports = router;

