const { Schema, model } = require("mongoose");
const isEmail = require("validator/lib/isEmail");
const isISO8601 = require('validator/lib/isISO8601');
const isDate = require("validator/lib/isDate");
const {
   Niveau, Sexe, ActeurDossier, TypeNotification,
   ModelNotif, EtapeDossier
} = require("./types");
const EnvoiDossier = require("./EnvoiDossier");
const { Dossier } = require("./Dossier");
const Notification = require('./Notification');
const { validerMatricule, validerNumTel } = require("../validators");
const bcrypt = require("bcrypt");


const EtudiantSchema = new Schema({
   matricule: {
      type: String,
      required: true,
      index: { unique: false },
      uppercase: true,
      validate: {
         validator: (mat) => validerMatricule(mat),
         message: (props) => `${props.value} est un matricule invalide!`,
      },
   },
   nom: { type: String, required: true },
   prenom: { type: String, required: true },
   motDePasse: { type: String, required: true },
   niveau: { type: String, required: true, enum: Object.values(Niveau) },
   email: {
      type: String,
      required: true,
      index: { unique: false },
      trim: true,
      validate: {
         validator: email => isEmail(email),
         message: props => `${props.value} est un email invalide!`
      }
   },
   dateNaissance: {
      type: String,
      required: true,
      validate: {
         validator: (date) => isDate(date),
         message: (props) => `
            ${props.value} est une date invalide. 
            Elle doit etre a la forme YYYY/MM/DD ou YYYY-MM-DD
         `,
      },
   },
   dateSoutenance: {
      type: String,
      validate: {
         validator: (date) => date !== '' ? isISO8601(date) : true,
         message: (props) => `
            ${props.value} est une date invalide. 
            Elle doit etre a la formeISO8601
         `,
      },
   },
   lieuNaissance: { type: String, required: true },
   numTelephone: {
      type: String,
      required: true,
      validate: {
         validator: numTel => validerNumTel(numTel),
         message: props => `${props.value} est un numero de telephone invalide!`
      }
   },
   sexe: { type: String, required: true, enum: Object.values(Sexe) },
   compteValideLe: Date,
   urlPhotoProfil: { type: String, default: '' },
   dossier: { type: Schema.Types.ObjectId, ref: 'Dossier' },
   departement: { type: Schema.Types.ObjectId, ref: 'Departement', required: true },
   encadreur: { type: Schema.Types.ObjectId, ref: 'Jury', required: true },
   // Note, etudiants de These n'ont pas de juges
   juges: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Jury' }],
      validate: [arr => arr.length <= 4, '{PATH} a plus de 4 elements']
   },
   // juges: [{ type: Schema.Types.ObjectId, ref: 'Jury' }]
},
   { timestamps: { createdAt: 'creeLe', updatedAt: 'misAJourLe' } }
);

// Unique together constraint
EtudiantSchema.index({ matricule: 1, niveau: 1 }, { unique: true });


EtudiantSchema.pre("save", function (next) {
   // This attribute will be passed to the post save hook
   this.wasNew = this.isNew;

   const user = this;
   if (this.isModified("motDePasse") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
         if (saltError) {
            return next(saltError)
         } else {
            bcrypt.hash(user.motDePasse, salt, function (hashError, hash) {
               if (hashError) {
                  return next(hashError)
               }
               user.motDePasse = hash;
               console.log(user.motDePasse);
               return next();
            })
         }
      })
   } else {
      return next();
   }
});

EtudiantSchema.post('save', async function (etud, next) {
   if (this.wasNew) {
      // Send notification to admin
      await Notification.create({
         type: TypeNotification.NOUVEAU_ETUDIANT,
         destinataireModel: ModelNotif.ADMIN,
         objetConcerne: etud._id,
         objetConcerneModel: ModelNotif.ETUDIANT,
      });
   }

   next();
});

// EtudiantSchema.methods.verifyPassword = function (motDePasse, cb) {
//    bcrypt.compare(motDePasse, this.motDePasse, function (err, isMatch) {
//       if (err) return cb(err);
//       cb(null, isMatch);
//    });
// };

EtudiantSchema.methods.getDossierObj = async function () {
   console.log("in get dossier obj")
   return await Dossier.findById(this.dossier);
};

EtudiantSchema.methods.getSujet = async function () {
   const dossierObj = await this.getDossierObj();
   if (dossierObj)
      return dossierObj.sujet;

   console.log("Cet etudiant n'a pas de dossier");
   return null;
};

EtudiantSchema.methods.setSujet = async function (sujet) {
   const dossierObj = await this.getDossierObj();
   if (dossierObj) {
      dossierObj.sujet = sujet
      await dossierObj.save();
      return true;
   }

   console.log("Cet etudiant n'a pas de dossier");
   return false;
}

EtudiantSchema.methods.getEtapeActuelle = async function () {
   let dossierObj = await this.getDossierObj();

   if (dossierObj)
      return dossierObj.getEtapeActuelle();

   return EtapeDossier.UNE;
};

EtudiantSchema.methods.peutUploader = async function () {
   // Si l'utilisateur est a la premiere etape ou si il n'a pas de dossier
   // il peut uploader. 
   // sinon il ne peut pas
   if (!(this.dossier))
      return true;

   let dossierObj = await this.getDossierObj();

   if (dossierObj === null)
      throw "Dossier correspondant non trouvé, il n'existe pas dans la bd."

   if (await dossierObj.getEtapeActuelle() === EtapeDossier.UNE)
      return true;

   return false;
};


EtudiantSchema.virtual("notifications", {
   ref: "Notification",
   localField: "_id",
   foreignField: "destinataire",
});


/**
 * Envoyer une notification a l'administrateur
 */
EtudiantSchema.post('save', async function (etudiant) {
   if (this.isNew)
      await Notification.create({
         type: TypeNotification.NOUVEAU_ETUDIANT,
         destinataireModel: ModelNotif.ADMIN,
         objetConcerne: etudiant._id,
         objetConcerneModel: ModelNotif.ETUDIANT
      });
});


// Operations

EtudiantSchema.methods.reinitialiser = async function () {
   // Reset everything, i.e. user restarts the entire process.
   // this may happen if user's file was previously rejected.
   // 
   if (this.dossier)
      return await Dossier.findByIdAndDelete(this.dossier);
}

EtudiantSchema.methods.incrementerEtape = async function (numEtapeSuivante) {
   if (this.dossier)
      return await (await this.getDossierObj()).incrementerEtape(numEtapeSuivante);
}

EtudiantSchema.methods.changerEncadreur = async function (idNouveauEncadreur) {
   // if (this.niveau != Niveau.MASTER) {
   //     throw new Error("L'etudiant doit etre en Masteur pour avoir un encadreur");
   // }

   this.encadreur = idNouveauEncadreur;
   await this.save();
};

EtudiantSchema.methods.changerSujet = async function (nouveauSujet) {
   await (await this.getDossierObj).changerSujet(nouveauSujet);
};

EtudiantSchema.methods.envoyerDossier = async function (
   destinataireId,
   destinataireModel
) {
   await EnvoiDossier.create({
      dossier: this.dossier,
      envoyePar: this._id,
      envoyeParModel: ActeurDossier.ETUDIANT,
      destinataireId,
      destinataireModel,
   });
};


EtudiantSchema.set('toObject', { virtuals: true });
EtudiantSchema.set('toJSON', { virtuals: true });


module.exports = model("Etudiant", EtudiantSchema);
