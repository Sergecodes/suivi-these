const { Schema, model } = require('mongoose')
const { Avis, AvisEmetteur } = require('./types')


const AvisSchema = new Schema({
    type: { type: String, required: true, enum: Object.values(Avis) },
    commentaire: String,  
    rapportUrl: String, 
    envoyeLe: { type: Date, default: Date.now, required: true },
    donnePar: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'donneParModel'
    },
    donneParModel: {
        type: String,
        required: true,
        enum: [AvisEmetteur.COORDONATEUR, AvisEmetteur.EXPERT, AvisEmetteur.CONSEIL]
    },
    vueLe: Date,
    dossier: { type: Schema.Types.ObjectId, ref: 'Dossier', required: true },
}, {
    timestamps: { createdAt: 'creeLe', updatedAt: 'misAJourLe' }
});


module.exports = model('Avis', AvisSchema);
