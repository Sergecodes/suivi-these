const { Schema, model } = require('mongoose')
const isEmail = require('validator/lib/isEmail')
const { 
    Niveau, Sexe, CategorieFichier, EtapeDossier: EtapeDossierEnum,
    GerantEtapeDossier, StatutDossier
} = require('./types')


const EtudiantSchema = new Schema({
    matricule: {
        type: String,
        required: true,
        index: { unique: true },
        // todo validate matricule; capitalize before saving
    },
    nom: { type: String, required: true }, 
    prenom: { type: String, required: true }, 
    motDePasse: {
        type: String,
        required: true
    },  // todo validate password length; encrypt password before saving (post method)
    niveau: { type: String, required: true, enum: [ Niveau.MASTER_2, Niveau.DOCTORAT ] },
    email: {
        type: String,
        required: true, 
        index: { unique: true },
        lowercase: true,
        trim: true,
        validate: {
            validator: email => isEmail(email),
            message: props => `${props.value} est un email invalide!`
        }
    },
    dateNaissance: { type: Date, required: true },
    lieuNaissance: { type: String, required: true }, 
    numTelephone: { type: String, required: true }, 
    sexe: { type: String, required: true, enum: Object.values(Sexe) },
    compteValideLe: Date,
    urlPhotoProfil: { type: String, required: true },
    dossier: { type: Schema.Types.ObjectId, ref: 'Dossier' },
    uniteRecherche: { type: Schema.Types.ObjectId, ref: 'UniteRecherche', required: true },
    encadreur: { type: Schema.Types.ObjectId, ref: 'Jury', required: true },
}, {
    timestamps: { createdAt: 'creeLe', updatedAt: 'misAJourLe' }
});


EtudiantSchema.virtual('notifications', {
    ref: 'Notification',
    localField: '_id',
    foreignField: 'destinataire'
});


// Dossier
const DossierSchema = new Schema({
    sujet: { type: String, required: true },
    statut: { 
        type: String, 
        required: true,
        default: StatutDossier.ATTENTE_VALIDATION,
        enum: [
            StatutDossier.ATTENTE_VALIDATION,
            StatutDossier.ACCEPTE_ADMIN, 
            StatutDossier.REJETE_ADMIN
        ]
    },
    raisonStatut: String,
}, {
    timestamps: { createdAt: 'dateDepot', updatedAt: 'misAJourLe' }
});


DossierSchema.virtual('etudiant', {
    ref: 'Etudiant',
    localField: '_id',
    foreignField: 'dossier'
});

DossierSchema.virtual('fichiers', {
    ref: 'FichierDossier',
    localField: '_id',
    foreignField: 'dossier'
});


// FichierDossier
const FichierDossierSchema = new Schema({
    categorie: {
        type: String,
        required: true,
        enum: [CategorieFichier.RESUME_THESE, CategorieFichier.THESE]
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
        enum: [
            EtapeDossierEnum.UNE, 
            EtapeDossierEnum.DEUX, 
            EtapeDossierEnum.TROIS, 
            EtapeDossierEnum.QUATRE, 
            EtapeDossierEnum.CINQ, 
            EtapeDossierEnum.SIX
        ]
    },
    debuteeLe: Date,
    acheveeLe: Date,
    delai: Date,
    gereePar: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'gereParModel'
    },
    gereeParModel: {
        type: String,
        required: true,
        enum: [
            GerantEtapeDossier.COORDONATEUR, 
            GerantEtapeDossier.EXPERT, 
            GerantEtapeDossier.JURY,
            GerantEtapeDossier.ADMIN
        ]
    },
});


// JuryNoteDossier 
const JuryNoteDossierSchema = new Schema({
    jury: { type: Schema.Types.ObjectId, ref: 'Jury', required: true },
    dossier:  { type: Schema.Types.ObjectId, ref: 'Dossier', required: true },
    noteLe: { type: Date, default: Date.now, required: true}
});


// Compilation des modeles
const Etudiant = model('Etudiant', EtudiantSchema);
const Dossier = model('Dossier', DossierSchema);
const FichierDossier = model('FichierDossier', FichierDossierSchema, 'fichiers_dossiers');
const EtapeDossier = model('EtapeDossier', EtapeDossierSchema, 'etapes_dossiers');
const JuryNoteDossier = model('JuryNoteDossier', JuryNoteDossierSchema, 'juries_notes_dossiers');

module.exports = { Etudiant, Dossier, FichierDossier, EtapeDossier, JuryNoteDossier };

