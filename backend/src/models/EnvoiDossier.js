const { Schema, model } = require('mongoose')
const Notification = require('./Notification')
const { 
    ActeurDossier, TypeNotification,
    CategorieFichierMaster, CategorieFichierThese
} = require('./types')


let acteursDossiers = Object.values(ActeurDossier);
let fichiersEnum = [
    ...new Set([
        ...Object.values(CategorieFichierMaster),
        ...Object.values(CategorieFichierThese)
    ])
];

const EnvoiDossierSchema = new Schema({
    envoyeLe: { type: Date, default: Date.now, required: true },
    vueLe: Date,
    message: String,
    dossier: { type: Schema.Types.ObjectId, ref: 'Dossier', required: true },
    envoyePar: { type: Schema.Types.ObjectId, refPath: 'envoyeParModel' },
    envoyeParModel: { type: String, required: true, enum: acteursDossiers },
    destinataire: { type: Schema.Types.ObjectId, refPath: 'destinataireModel' },
    destinataireModel: { type: String, required: true, enum: acteursDossiers },
    fichiersConcernes: {
        type: [{ type: String, enum: fichiersEnum }],
        validate: {
            validator: arr => arr.length <= fichiersEnum.length,
            message: props => `${props.value} a plus de ${fichiersEnum.length} elements`
        }
    } 
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

