import { Schema } from 'mongoose'


const EnvoiDossierSchema = new Schema({
    envoyeLe: { type: Date, default: Date.now, required: true },
    vueLe: Date,
    dossier: '',
    destinataire: ''
});


// EnvoiDossierCoordonateur



// EnvoiDossierExpert


// EnvoiDossierRectorat


// EnvoiDossierConseil



