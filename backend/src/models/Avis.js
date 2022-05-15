const { Schema, model } = require('mongoose')
const { 
    Avis, AvisEmetteur, AvisDestinataire, 
    ModelNotif, TypeNotification 
} = require('./types')
const Notification = require('./Notification');


const AvisSchema = new Schema({
    type: { type: String, required: true, enum: Object.values(Avis) },
    rapport: String, 
    commentaire: String,  
    envoyeLe: { type: Date, default: Date.now, required: true },
    donnePar: { type: Schema.Types.ObjectId, refPath: 'donneParModel' },
    donneParModel: { type: String, required: true, enum: Object.values(AvisEmetteur) },
    destinataire: { type: Schema.Types.ObjectId, refPath: 'destinataireModel' },
    destinataireModel: {
        type: String,
        required: true,
        default: AvisDestinataire.ADMIN,
        enum: Object.values(AvisDestinataire)
    },
    vueLe: Date,
    dossier: { type: Schema.Types.ObjectId, ref: 'Dossier', required: true },
}, {
    timestamps: { createdAt: 'creeLe', updatedAt: 'misAJourLe' }
});


/**
 * Envoyer une notification au destinataire
 */
 AvisSchema.post('save', async function(avis, next) {
    await Notification.create({
        type: TypeNotification.NOUVEL_AVIS,
        destinataire: avis.destinataire,
        destinataireModel: avis.destinataireModel,
        objetConcerne: avis._id,
        objetConcerneModel: ModelNotif.AVIS
    });

    next();
});


module.exports = model('Avis', AvisSchema);
