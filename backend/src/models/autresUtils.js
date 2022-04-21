/** Contient des methodes des administrateurs... */

const { TypeNotification, StatutDossier, ModelNotif } = require('./types')
const Notification = require('./Notification')


/**
 * Rejeter le dossier d'un etudiant
 * @param dossier: L'objet document
 * @param raison
 */
async function rejeterDossier(dossier, raison) {
    dossier.statut = StatutDossier.REJETE_ADMIN;
    dossier.raisonStatut = raison;
    await dossier.save();

    await dossier.populate('etudiant', '_id');

    // Notifier l'etudiant
    await Notification.create({
        type: TypeNotification.DOSSIER_REJETE,
        destinataire: dossier.etudiant._id,
        destinataireModel: ModelNotif.ETUDIANT,
        objetConcerne: dossier._id,
        objetConcerneModel: ModelNotif.DOSSIER
    });
}


/**
 * Rejeter l'inscription d'un etudiant
 * @param etudiant: L'objet document
 * @param raison
 */
async function rejeterEtudiant(etudiant, raison) {
    // Notifier l'etudiant
    await Notification.create({
        type: TypeNotification.COMPTE_REJETE,
        destinataire: etudiant,
        destinataireModel: ModelNotif.ETUDIANT,
        objetConcerne: etudiant._id,
        objetConcerneModel: ModelNotif.ETUDIANT,
        message: raison
    });
}


module.exports = { rejeterDossier, rejeterEtudiant };

