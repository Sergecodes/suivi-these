const { Schema, model } = require('mongoose')
const Notification = require('./Notification')
const { 
    ActeurDossier, TypeNotification, ModelNotif,
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
    commentaire: { type: String, default: '' },
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


EnvoiDossierSchema.pre('save', function (next) {
    // This attribute will be passed to the post save hook
    this.wasNew = this.isNew;
    next();
});


/**
 * Envoyer une notification aux destinataire et emetteur
 */
EnvoiDossierSchema.post('save', async function(envDossier, next) {
    if (this.wasNew) {
        let notifs = [{
            type: TypeNotification.DOSSIER_ENVOYE,
            destinataire: envDossier.envoyePar,
            destinataireModel: envDossier.envoyeParModel,
            objetConcerne: envDossier._id,
            objetConcerneModel: ModelNotif.ENVOI_DOSSIER
        }, {
            type: TypeNotification.NOUVEL_AVIS,
            destinataire: envDossier.destinataire,
            destinataireModel: envDossier.destinataireModel,
            objetConcerne: envDossier._id,
            objetConcerneModel: ModelNotif.ENVOI_DOSSIER
        }];
    
        await Notification.insertMany(notifs);
    }

    next();
});


EnvoiDossierSchema.set('toObject', { virtuals: true });
EnvoiDossierSchema.set('toJSON', { virtuals: true });


module.exports = model('EnvoiDossier', EnvoiDossierSchema, 'envois_dossiers');

