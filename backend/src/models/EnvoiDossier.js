const { Schema, model } = require('mongoose')
const { ActeurDossier } = require('./types')


const EnvoiDossierSchema = new Schema({
    envoyeLe: { type: Date, default: Date.now, required: true },
    vueLe: Date,
    dossier: { type: Schema.Types.ObjectId, ref: 'Dossier', required: true },
    envoyePar: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'envoyeParModel'
    },
    envoyeParModel: {
        type: String,
        required: true,
        enum: [
            ActeurDossier.ETUDIANT,
            ActeurDossier.COORDONATEUR, 
            ActeurDossier.EXPERT, 
            ActeurDossier.CONSEIL,
            ActeurDossier.JURY, 
            ActeurDossier.RECTORAT,
            ActeurDossier.ADMIN
        ]
    },
    destinataire: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'destinataireModel'
    },
    destinataireModel: {
        type: String,
        required: true,
        enum: [
            ActeurDossier.COORDONATEUR, 
            ActeurDossier.EXPERT, 
            ActeurDossier.CONSEIL,
            ActeurDossier.JURY, 
            ActeurDossier.RECTORAT,
            ActeurDossier.ADMIN
        ]
    },
});


module.exports = model('EnvoiDossier', EnvoiDossierSchema, 'envois_dossiers');

