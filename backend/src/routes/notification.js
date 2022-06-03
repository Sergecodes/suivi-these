const router = require('express').Router();
const controller = require('../controllers/notification');


router.route('/:id/marquer-lu').put(controller.marquerLu);

router.route('/:id').delete(controller.supprimer).get(controller.getNotif);


module.exports = router;

