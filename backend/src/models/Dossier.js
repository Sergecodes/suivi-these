const { Schema, model } = require('mongoose')
const { 
    CategorieFichier, EtapeDossier: EtapeDossierEnum,
    GerantEtapeDossier, StatutDossier
} = require('./types')


const DossierSchema = new Schema({
    sujet: { type: String, required: true },
    statut: { 
        type: String, 
        required: true,
        default: StatutDossier.ATTENTE_VALIDATION,
        enum: Object.values(StatutDossier)
    },
    raisonStatut: String,
}, {
    timestamps: { createdAt: 'dateDepot', updatedAt: 'misAJourLe' }
});


DossierSchema.virtual('etudiant', {
    ref: 'Etudiant',
    localField: '_id',
    foreignField: 'dossier',
    justOne: true
});

DossierSchema.virtual('fichiers', {
    ref: 'FichierDossier',
    localField: '_id',
    foreignField: 'dossier'
});

DossierSchema.virtual('etapes', {
    ref: 'EtapeDossier',
    localField: '_id',
    foreignField: 'dossier'
});

DossierSchema.virtual('etapeActuelle').get(function() {
    const EtapeDossier = model('EtapeDossier');
    EtapeDossier.findById(this._id).populate('etapes');
});


// Operations
DossierSchema.methods.changerSujet = function(nouveauSujet) {
    if (this.sujet !== nouveauSujet) {
        this.sujet = nouveauSujet;
        await this.save();
        // this.save().then(dossier => {
        //     console.log("Le nouveau sujet est", dossier.sujet);
        // }).catch(err => {
        //     console.error(err);
        // });
    }
};


// FichierDossier
const FichierDossierSchema = new Schema({
    categorie: {
        type: String,
        required: true,
        enum: Object.values(CategorieFichier)
    },
    uploadeLe: { type: Date, required: true, default: Date.now },
    dossier: { type: Schema.Types.ObjectId, ref: 'Dossier' },
});


// EtapeDossier
const EtapeDossierSchema = new Schema({
    numEtape: { 
        type: Number, 
        required: true, 
        default: EtapeDossierEnum.UNE,
        enum: Object.values(EtapeDossierEnum)
    },
    dossier: { type: Schema.Types.ObjectId, ref: 'Dossier', required: true },
    debuteeLe: Date,
    acheveeLe: Date,
    delai: Date,
    gereePar: {
        type: String,
        required: true,
        enum: Object.values(GerantEtapeDossier)
    },
});


// JuryNoteDossier 
const JuryNoteDossierSchema = new Schema({
    jury: { type: Schema.Types.ObjectId, ref: 'Jury', required: true },
    dossier:  { type: Schema.Types.ObjectId, ref: 'Dossier', required: true },
    noteLe: { type: Date, default: Date.now, required: true}
});


const Dossier = model('Dossier', DossierSchema);
const FichierDossier = model('FichierDossier', FichierDossierSchema, 'fichiers_dossiers');
const EtapeDossier = model('EtapeDossier', EtapeDossierSchema, 'etapes_dossiers');
const JuryNoteDossier = model('JuryNoteDossier', JuryNoteDossierSchema, 'juries_notes_dossiers');


module.exports = { Dossier, FichierDossier, EtapeDossier, JuryNoteDossier };

