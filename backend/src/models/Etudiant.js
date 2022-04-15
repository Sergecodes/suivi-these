import { Schema } from 'mongoose'
import isEmail from 'validator/lib/isEmail'
import { 
    Niveau, Sexe, CategorieFichier, EtapeDossier, 
    GerantEtapeDossier, StatutDossier
} from './types'


// todo search created_at and updated_at fields mongoose
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
            message: `{VALUE} est un email invalide`
        }
    },
    dateNaissance: { type: Date, required: true },
    lieuNaissance: { type: String, required: true }, 
    numTelephone: { type: String, required: true }, 
    sexe: {
        type: String,
        required: true,
        enum: [Sexe.MALE, Sexe.FEMELLE]
    },
    compteValideLe: Date,
    urlPhotoProfil: { type: String, required: true },
    dossier: { type: Schema.Types.ObjectId, ref: 'Dossier' },
    uniteRecherche: { type: Schema.Types.ObjectId, ref: 'UniteRecherche', required: true },
    encadreur: { type: Schema.Types.ObjectId, ref: 'Jury', required: true },
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
    dateDepot: { type: Date, required: true, default: Date.now },
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
        type: number, 
        required: true, 
        default: EtapeDossier.UNE,
        enum: [
            EtapeDossier.UNE, 
            EtapeDossier.DEUX, 
            EtapeDossier.TROIS, 
            EtapeDossier.QUATRE, 
            EtapeDossier.CINQ, 
            EtapeDossier.SIX
        ]
    },
    debuteLe: Date,
    acheveLe: Date,
    delai: Date,
    gereParModelId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'gerePar'
    },
    gerePar: {
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
const Etudiant = mongoose.model('Etudiant', EtudiantSchema);
const Dossier = mongoose.model('Dossier', DossierSchema);
const FichierDossier = mongoose.model('FichierDossier', FichierDossierSchema);
const EtapeDossier = mongoose.model('EtapeDossier', EtapeDossierSchema);
const JuryNoteDossier = mongoose.model('JuryNoteDossier', JuryNoteDossierSchema);

export { Etudiant, Dossier, FichierDossier, EtapeDossier, JuryNoteDossier };

