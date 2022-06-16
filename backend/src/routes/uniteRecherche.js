const router = require('express').Router();
const controller = require('../controllers/uniteRecherche');
const { getUniteFromParam } = require('../middlewares');


router.route('').get(controller.getAll);

router.route('/:id').get(getUniteFromParam, controller.getOne).delete(controller.delete);

router.route('/register').post(controller.register_unite);


module.exports = router;

