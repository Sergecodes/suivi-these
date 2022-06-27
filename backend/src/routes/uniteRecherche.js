const router = require('express').Router();
const controller = require('../controllers/uniteRecherche');
const { isAdmin, getUniteFromParam } = require('../middlewares');


router.route('').get(controller.getAll);

router.route('/register').post(controller.register_unite);

router.route('/:id').get(getUniteFromParam, controller.getOne)
.delete(isAdmin, controller.delete);


module.exports = router;

