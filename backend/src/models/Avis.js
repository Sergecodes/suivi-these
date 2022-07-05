const { Schema, model } = require('mongoose')
const { 
    Avis, AvisEmetteur, AvisDestinataire, 
    ModelNotif, TypeNotification 
} = require('./types')
const Notification = require('./Notification');


const AvisSchema = new Schema({
    type: { type: String, required: true, enum: Object.values(Avis) },
    rapport: { type: String, default: '' }, 
    commentaire: { type: String, default: '' },  
    donneLe: { type: Date, default: Date.now, required: true },
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
    if (this.isNew)
        await Notification.create({
            type: TypeNotification.NOUVEL_AVIS,
            destinataire: avis.destinataire,
            destinataireModel: avis.destinataireModel,
            objetConcerne: avis._id,
            objetConcerneModel: ModelNotif.AVIS
        });

    next();
});


AvisSchema.set('toObject', { virtuals: true });
AvisSchema.set('toJSON', { virtuals: true });


module.exports = model('Avis', AvisSchema);
