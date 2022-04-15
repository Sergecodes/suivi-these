import { Schema } from 'mongoose'
import { Avis, AvisEmetteur } from './types'


const AvisSchema = new Schema({
    type: { 
        type: String, 
        enum: [
            Avis.POSITIF, 
            Avis.NEGATIF, 
            Avis.SOUTENANCE_FAVORABLE, 
            Avis.FAVORABLE_SOUS_RESERVE, 
            Avis.DEFAVORABLE
        ] 
    },
    commentaire: String,  
    rapportUrl: String, 
    envoyeLe: { type: Date, default: Date.now, required: true },
    donneParModelId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'donnePar'
    },
    donnePar: {
        type: String,
        required: true,
        enum: [AvisEmetteur.COORDONATEUR, AvisEmetteur.EXPERT, AvisEmetteur.CONSEIL]
    },
    vueLe: Date,
    dossier: { type: Schema.Types.ObjectId, ref: 'Dossier', required: true },
});


const Avis = mongoose.model('Avis', AvisSchema);


export default Avis;



// AvisCoordonateur


// AvisExpert


// AvisConseil


