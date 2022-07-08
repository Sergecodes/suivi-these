const Notification = require('../models/Notification');


exports.getNotif = async function (req, res) {
   const { id } = req.params;
   let notif = await Notification
      .findById(id)
      .populate('objetConcerne')
      .populate('destinataire');

   if (!notif)
      return res.status(404).send("Notification non trouvée");

   res.json(notif);
}

exports.marquerLu = async function (req, res) {
   const { id } = req.params;
   let notif = await Notification.findById(id);

   if (!notif)
      return res.status(404).send("Notification non trouvée");

   notif.vueLe = new Date();
   await notif.save();

   res.json({ vueLe: notif.vueLe });
}


exports.supprimer = function (req, res) {
   const { id } = req.params;

   Notification.findByIdAndDelete(id, function (err, doc) {
      if (!doc)
         return res.status(404).send("Cette notification n'existe pas");
      if (err) {
         console.error(err);
         return res.status(500).json(err);
      }

      res.status(204).send("Supprimée");
   });
}








