const { Schema, model } = require('mongoose')
const { Avis, AvisEmetteur, AvisDestinataire } = require('./types')


const AvisSchema = new Schema({
    type: { type: String, required: true, enum: Object.values(Avis) },
    rapport: String, 
    commentaire: String,  
    envoyeLe: { type: Date, default: Date.now, required: true },
    donnePar: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'donneParModel'
    },
    donneParModel: {
        type: String,
        required: true,
        enum: Object.values(AvisEmetteur)
    },
    destinataire: {
        type: Schema.Types.ObjectId,
        // required: true,
        refPath: 'destinataireModel'
    },
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


module.exports = model('Avis', AvisSchema);
