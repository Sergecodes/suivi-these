const Notif = require('../models/Notification');


exports.getNotif = async function (req, res) {
   const { id } = req.params;
   let notif = await Notif.findById(id).populate('objetConcerne', 'destinataire');

   if (!notif)
      return res.status(404).send("Notification non trouve");

   res.json(notif);
}

exports.marquerLu = async function (req, res) {
   const { id } = req.params;
   let notif = await Notif.findById(id);

   if (!notif)
      return res.status(404).send("Notification non trouve");

   notif.vueLe = new Date();
   await notif.save();

   res.send("Success");
}


exports.supprimer = function (req, res) {
   const { id } = req.params;

   Notif.findByIdAndDelete(id, function (err, doc) {
      if (!doc)
         return res.status(404).send("Cette notification n'existe pas");
      if (err){
          console.error(err);
          return res.send("Une erreur est souvenu").status(500)
      }

      res.status(205).send("Supprime");
  });
}








