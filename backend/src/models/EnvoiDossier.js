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
 * Envoyer une notification aux destinataire et emetteur
 */
EnvoiDossierSchema.post('save', async function(envDossier) {
    if (this.isNew) {
        let notifs = [
            new Notification({
                type: TypeNotification.DOSSIER_ENVOYE,
                destinataire: envDossier.envoyePar,
                destinataireModel: envDossier.envoyeParModel,
                objetConcerne: envDossier._id,
                objetConcerneModel: ModelNotif.ENVOI_DOSSIER
            }),
            new Notification({
                type: TypeNotification.NOUVEL_AVIS,
                destinataire: envDossier.destinataire,
                destinataireModel: envDossier.destinataireModel,
                objetConcerne: envDossier._id,
                objetConcerneModel: ModelNotif.ENVOI_DOSSIER
            })
        ];
    
        await Notification.bulkSave(notifs);

        // await Notification.create({
        //     type: TypeNotification.DOSSIER_ENVOYE,
        //     destinataire: envDossier.envoyePar,
        //     destinataireModel: envDossier.envoyeParModel,
        //     objetConcerne: envDossier._id,
        //     objetConcerneModel: ModelNotif.ENVOI_DOSSIER
        // });
    
        // await Notification.create({
        //     type: TypeNotification.NOUVEL_AVIS,
        //     destinataire: envDossier.destinataire,
        //     destinataireModel: envDossier.destinataireModel,
        //     objetConcerne: envDossier._id,
        //     objetConcerneModel: ModelNotif.ENVOI_DOSSIER
        // });
    }
});


EnvoiDossierSchema.set('toObject', { virtuals: true });
EnvoiDossierSchema.set('toJSON', { virtuals: true });


module.exports = model('EnvoiDossier', EnvoiDossierSchema, 'envois_dossiers');

