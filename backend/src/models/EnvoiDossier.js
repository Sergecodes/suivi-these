const { Schema, model } = require('mongoose')
const { ActeurDossier, TypeNotification } = require('./types')
const Notification = require('./Notification')


let acteursDossiers = Object.values(ActeurDossier);

const EnvoiDossierSchema = new Schema({
    envoyeLe: { type: Date, default: Date.now, required: true },
    vueLe: Date,
    message: String,
    dossier: { type: Schema.Types.ObjectId, ref: 'Dossier', required: true },
    envoyePar: {
        type: Schema.Types.ObjectId,
        // required: true,
        refPath: 'envoyeParModel'
    },
    envoyeParModel: {
        type: String,
        required: true,
        enum: acteursDossiers
    },
    destinataire: {
        type: Schema.Types.ObjectId,
        // required: true,
        refPath: 'destinataireModel'
    },
    destinataireModel: {
        type: String,
        required: true,
        enum: acteursDossiers
    },
});


/**
 * Envoyer une notification au destinataire
 */
EnvoiDossierSchema.post('save', async function(envDossier) {
    await Notification.create({
        type: TypeNotification.NOUVEL_AVIS,
        destinataire: envDossier.destinataire,
        destinataireModel: envDossier.destinataireModel,
        objetConcerne: envDossier._id,
        objetConcerneModel: ModelNotif.AVIS
    });
});


module.exports = model('EnvoiDossier', EnvoiDossierSchema, 'envois_dossiers');

