const { Schema, model } = require("mongoose");
const {
  CategorieFichierMaster,
  CategorieFichierThese,
  ModelNotif,
  Niveau,
  ActeurDossier,
  EtapeDossier: EtapeDossierEnum,
} = require("./types");
const Avis = require("./Avis");
const { sum, getEtapeWording } = require("../utils");
// const isDate = require("validator/lib/isDate");
const Etudiant = require('./Etudiant');
const EnvoiDossier = require("./EnvoiDossier");
const Notification = require("./Notification");

const FINAL_NUM_ETAPE_MASTER = 8;
const FINAL_NUM_ETAPE_THESE = 8;

const DossierSchema = new Schema(
  {
    etudiant: { type: Schema.Types.ObjectId, ref: "Etudiant", required: true },
    sujet: { type: String, required: true },
    rejeteParActeur: {
      type: String,
      enum: Object.values(ActeurDossier)
    },
    raisonRejet: { type: String, default: '' },
    rejeteLe: Date
  },
  {
    timestamps: { createdAt: "dateDepot", updatedAt: "misAJourLe" },
  }
);

DossierSchema.virtual("fichiers", {
  ref: "FichierDossier",
  localField: "_id",
  foreignField: "dossier",
});

DossierSchema.virtual("notes", {
  ref: "NoteDossier",
  localField: "_id",
  foreignField: "dossier",
});

DossierSchema.virtual("etapes", {
  ref: "EtapeDossier",
  localField: "_id",
  foreignField: "dossier",
});

DossierSchema.virtual("avis", {
  ref: "Avis",
  localField: "_id",
  foreignField: "dossier",
});


// pre- remove middleware
// Delete etapes, notes and fichiers when dossier is deleted
DossierSchema.pre("remove", function (next) {
  EtapeDossier.remove({ dossier: this._id }).exec();
  NoteDossier.remove({ dossier: this._id }).exec();
  FichierDossier.remove({ dossier: this._id }).exec();
  Avis.remove({ dossier: this._id }).exec();
  EnvoiDossier.remove({ dossier: this._id }).exec();
  Notification.remove({
    objetConcerne: this._id,
    objetConcerneModel: ModelNotif.DOSSIER,
  }).exec();

  next();
});

DossierSchema.methods.getEtudiantObj = async function () {
  return await Etudiant.findById(this.etudiant);
}

DossierSchema.methods.getNotesTotales = async function () {
  await this.populate("notes");

  let result = [];
  for (let noteDossier of this.notes) {
    result.push(noteDossier.total);
  }

  return result;
};

DossierSchema.methods.getEtapeActuelle = async function () {
  await this.populate("etapes");
  return this.etapes.at(-1);
};

DossierSchema.methods.incrementerEtape = async function (numEtapeSuivante) {
  console.log("in incrementer etape");
  let dossier = this;
  await dossier.populate('etudiant', 'niveau');

  const numDerniereEtape = (function () {
    return dossier.etudiant.niveau === Niveau.MASTER
      ? FINAL_NUM_ETAPE_MASTER
      : FINAL_NUM_ETAPE_THESE;
  })();

  const etapeActu = await dossier.getEtapeActuelle();
  if (numEtapeSuivante === undefined) {
    numEtapeSuivante = etapeActu.numEtape + 1;
  }

  // L'utilisateur a deja termine
  if (numEtapeSuivante > numDerniereEtape) {
    console.log("Cet utilisateur a deja termine son processus.");
  } else {
    if (!etapeActu.acheveeLe) {
      etapeActu.acheveeLe = new Date();
      await etapeActu.save();
    }

    try {
      await EtapeDossier.create({
        dossier: dossier._id,
        numEtape: numEtapeSuivante,
      });
    } catch (err) {
      console.error(err);
      console.log("Cette etape a deja debute");
    }
  }
};

DossierSchema.methods.changerSujet = async function (nouveauSujet) {
  if (nouveauSujet && this.sujet !== nouveauSujet) {
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
        ...Object.values(CategorieFichierThese),
      ]),
    ],
  },
  url: { type: String, required: true },
  uploadeLe: { type: Date, required: true, default: Date.now },
  dossier: { type: Schema.Types.ObjectId, ref: "Dossier", required: true },
});

FichierDossierSchema.index({ dossier: 1, categorie: 1 }, { unique: true });

// EtapeDossier
const EtapeDossierSchema = new Schema({
  numEtape: {
    type: Number,
    required: true,
    default: EtapeDossierEnum.UNE,
    enum: Object.values(EtapeDossierEnum),
  },
  dossier: { type: Schema.Types.ObjectId, ref: "Dossier", required: true },
  debuteeLe: { type: Date, default: Date.now, required: true },
  description: { type: String, default: '' },
  acheveeLe: Date,
  delai: Date,
  extra: { type: String, default: '' },
  // acheveeLe: {
  //     type: String,
  //     required: true,
  //     validate: {
  //        validator: (date) => isDate(date),
  //        message: (props) => `
  //           ${props.value} est une date invalide.
  //           Elle doit etre a la forme YYYY/MM/DD ou YYYY-MM-DD
  //        `,
  //     },
  //  },
  // delai: {
  //     type: String,
  //     validate: {
  //        validator: (date) => isDate(date),
  //        message: (props) => `
  //           ${props.value} est une date invalide.
  //           Elle doit etre a la forme YYYY/MM/DD ou YYYY-MM-DD
  //        `,
  //     },
  //  },
  // extra: String,
});

// Set description to Etape Dossier
EtapeDossierSchema.pre("save", async function (next) {
  if (this.isNew ||  !this.description) {
    console.log("going to set etape dossier description");

    // Get niveau of Etudiant
    await this.populate({
      path: 'dossier',
      select: 'etudiant',
      populate: {
        path: 'etudiant',
        select: 'niveau'
      }
    });
    
    this.description = getEtapeWording(this.numEtape, this.dossier.etudiant.niveau);
  }

  next();
});

EtapeDossierSchema.index({ dossier: 1, numEtape: 1 }, { unique: true });

// NoteDossier
const NoteDossierSchema = new Schema({
  dossier: { type: Schema.Types.ObjectId, ref: "Dossier", required: true },
  // avis: { type: Schema.Types.ObjectId, ref: 'Avis' },
  // categorie: { type: String, required: true, enum: Object.values(CategorieNote) },
  // Object with category as key and value as mark
  notes: { type: Object, required: true },
  notePar: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Jury",
    // refPath: 'noteParModel'
  },
  // noteParModel: {
  //   type: String,
  //   required: true,
  //   default: ActeurDossier.JURY,
  //   enum: Object.values(ActeurDossier)
  // },
  noteLe: { type: Date, default: Date.now, required: true },
  commentaire: { type: String, default: '' },
});

NoteDossierSchema.pre("save", function (next) {
  if (this.isModified("notes") || this.isNew) {
    let total = 0,
      notes = this.notes;
    for (let key in notes) total += parseInt(notes[key], 10);

    this.total = total;
  }

  next();
});

NoteDossierSchema.virtual("total").get(function () {
  // Pass empty array if notes is undefined
  return sum(Object.values(this.notes || {}));
});

NoteDossierSchema.index({ dossier: 1, notePar: 1 }, { unique: true });

/*
 * Envoyer une notification a l'administrateur
 */
// NoteDossierSchema.post('save', async function(doc) {
// if(this.isNew)
//     await Notification.create({
//         type: TypeNotification.NOTE_JURY,
//         destinataireModel: ModelNotif.ADMIN,
//         objetConcerne: doc._id,
//         objetConcerneModel: ModelNotif.NOTE_DOSSIER
//     });
// });

DossierSchema.set("toObject", { virtuals: true });
DossierSchema.set("toJSON", { virtuals: true });

FichierDossierSchema.set("toObject", { virtuals: true });
FichierDossierSchema.set("toJSON", { virtuals: true });

EtapeDossierSchema.set("toObject", { virtuals: true });
EtapeDossierSchema.set("toJSON", { virtuals: true });

NoteDossierSchema.set("toObject", { virtuals: true });
NoteDossierSchema.set("toJSON", { virtuals: true });

const Dossier = model("Dossier", DossierSchema);
const FichierDossier = model(
  "FichierDossier",
  FichierDossierSchema,
  "fichiers_dossiers"
);
const EtapeDossier = model(
  "EtapeDossier",
  EtapeDossierSchema,
  "etapes_dossiers"
);
const NoteDossier = model("NoteDossier", NoteDossierSchema, "notes_dossiers");

module.exports = { Dossier, FichierDossier, EtapeDossier, NoteDossier };
