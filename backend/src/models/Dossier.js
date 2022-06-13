const { Schema, model } = require('mongoose')
const { 
    CategorieFichierMaster, CategorieFichierThese, 
    GerantEtapeDossier, ModelNotif, Niveau,
    CategorieNote, ActeurDossier, 
    EtapeDossier: EtapeDossierEnum,
} = require('./types');
const Avis = require('./Avis');
const isDate = require("validator/lib/isDate");
const EnvoiDossier = require('./EnvoiDossier');
const Notification = require('./Notification');

const FINAL_NUM_ETAPE_MASTER = 8;
const FINAL_NUM_ETAPE_THESE = 8;


const DossierSchema = new Schema({
    etudiant: { type: Schema.Types.ObjectId, ref: 'Etudiant', required: true },
    sujet: { type: String, required: true },
    // statut: { 
    //     type: String, 
    //     required: true,
    //     default: StatutDossier.ATTENTE_VALIDATION,
    //     enum: Object.values(StatutDossier)
    // },
    // raisonStatut: String,
}, {
    timestamps: { createdAt: 'dateDepot', updatedAt: 'misAJourLe' }
});


DossierSchema.virtual('fichiers', {
    ref: 'FichierDossier',
    localField: '_id',
    foreignField: 'dossier'
});

DossierSchema.virtual('notes', {
    ref: 'NoteDossier',
    localField: '_id',
    foreignField: 'dossier',
});

DossierSchema.virtual('etapes', {
    ref: 'EtapeDossier',
    localField: '_id',
    foreignField: 'dossier'
});

DossierSchema.virtual('avis', {
    ref: 'Avis',
    localField: '_id',
    foreignField: 'dossier'
});


// pre- remove middleware
// Delete etapes, notes and fichiers when dossier is deleted
DossierSchema.pre('remove', function(next) {
    EtapeDossier.remove({ dossier: this._id }).exec();
    NoteDossier.remove({ dossier: this._id }).exec();
    FichierDossier.remove({ dossier: this._id }).exec();
    Avis.remove({ dossier: this._id }).exec();
    EnvoiDossier.remove({ dossier: this._id }).exec();
    Notification.remove({ 
        objetConcerne: this._id, 
        objetConcerneModel: ModelNotif.DOSSIER 
    }).exec();

    next();
});


DossierSchema.virtual('etapeActuelle').get(async function() {
    await this.populate('etapes');
    return this.etapes.at(-1);
});


DossierSchema.methods.incrementerEtape = async function(niveau, description) {
    const numDerniereEtape = (function () {
        return niveau === Niveau.MASTER ? FINAL_NUM_ETAPE_MASTER : FINAL_NUM_ETAPE_THESE
    })();

    let etapeActu = await this.etapeActuelle;
    if (!etapeActu.acheveeLe) {
        etapeActu.acheveeLe = new Date();
        await etapeActu.save();
    }

    // L'utilisateur a deja termine
    if (etapeActu === numDerniereEtape) {
        console.log("Cet utilisateur a deja termine son processus.");
    } else {
        await EtapeDossier.create({
            dossier: this._id,
            numEtape: etapeActu.numEtape + 1,
            description
        });
    }
}


DossierSchema.methods.changerSujet = async function(nouveauSujet) {
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
        enum: [
            ...new Set([
                ...Object.values(CategorieFichierMaster),
                ...Object.values(CategorieFichierThese)
            ])
        ]
    },
    url: { type: String, required: true },
    uploadeLe: { type: Date, required: true, default: Date.now },
    dossier: { type: Schema.Types.ObjectId, ref: 'Dossier', required: true },
});

FichierDossierSchema.index( { dossier: 1, categorie: 1 }, { unique: true } );


// EtapeDossier
const EtapeDossierSchema = new Schema({
    numEtape: { 
        type: Number, 
        required: true, 
        default: EtapeDossierEnum.UNE,
        enum: Object.values(EtapeDossierEnum)
    },
    dossier: { type: Schema.Types.ObjectId, ref: 'Dossier', required: true },
    debuteeLe: { type: Date, default: Date.now, required: true },
    acheveeLe: { 
        type: String, 
        required: true,
        validate: {
           validator: (date) => isDate(date, { strictMode: true }),
           message: (props) => `
              ${props.value} est une date invalide. 
              Elle doit etre a la forme YYYY/MM/DD ou YYYY-MM-DD
           `,
        },
     },
    delai: { 
        type: String, 
        required: true,
        validate: {
           validator: (date) => isDate(date, { strictMode: true }),
           message: (props) => `
              ${props.value} est une date invalide. 
              Elle doit etre a la forme YYYY/MM/DD ou YYYY-MM-DD
           `,
        },
     },
    extra: String,
});


EtapeDossierSchema.index({ dossier: 1, numEtape: 1 }, { unique: true } );


// NoteDossier
const NoteDossierSchema = new Schema({
    dossier: { type: Schema.Types.ObjectId, ref: 'Dossier', required: true },
    avis: { type: Schema.Types.ObjectId, ref: 'Avis' },
    categorie: { type: String, required: true, enum: Object.values(CategorieNote) },
    valeur: { type: Number, required: true },
    notePar: { 
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'noteParModel'
    },
    noteParModel: {
        type: String,
        required: true,
        default: ActeurDossier.JURY,
        enum: Object.values(ActeurDossier)
    },
    noteLe: { type: Date, default: Date.now, required: true },
});


NoteDossierSchema.index({ dossier: 1, categorie: 1 }, { unique: true } );

/*
 * Envoyer une notification a l'administrateur
 */
// NoteDossierSchema.post('save', async function(doc) {
//     await Notification.create({
//         type: TypeNotification.NOTE_JURY,
//         destinataireModel: ModelNotif.ADMIN,
//         objetConcerne: doc._id,
//         objetConcerneModel: ModelNotif.NOTE_DOSSIER
//     });
// });


const Dossier = model('Dossier', DossierSchema);
const FichierDossier = model('FichierDossier', FichierDossierSchema, 'fichiers_dossiers');
const EtapeDossier = model('EtapeDossier', EtapeDossierSchema, 'etapes_dossiers');
const NoteDossier = model('NoteDossier', NoteDossierSchema, 'notes_dossiers');


module.exports = { Dossier, FichierDossier, EtapeDossier, NoteDossier };

