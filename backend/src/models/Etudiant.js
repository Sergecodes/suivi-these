const { Schema, model } = require('mongoose')
const isEmail = require('validator/lib/isEmail')
const { Niveau, Sexe, ActeurDossier, TypeNotification, ModelNotif } = require('./types')
const EnvoiDossier = require('./EnvoiDossier')
const Dossier = require('./Dossier')
const Notification = require('./Notification')
const { validerMatricule } = require('../utils')
const bcrypt = require('bcrypt');


const EtudiantSchema = new Schema({
    matricule: {
        type: String,
        required: true,
        index: true,
        validate: {
            validator: mat => validerMatricule(mat),
            message: props => `${props.value} est un matricule invalide!`
        }
        // todo validate matricule; uppercase before saving
    },
    nom: { type: String, required: true }, 
    prenom: { type: String, required: true }, 
    motDePasse: {
        type: String,
        required: true
    },  // todo validate password length; encrypt password before saving (post method)
    niveau: { type: String, required: true, enum: Object.values(Niveau) },
    email: {
        type: String,
        required: true, 
        index: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: email => isEmail(email),
            message: props => `${props.value} est un email invalide!`
        }
    },
    dateNaissance: { type: Date, required: true },
    dateSoutenance: Date,
    lieuNaissance: { type: String, required: true }, 
    numTelephone: { type: String, required: true }, 
    sexe: { type: String, required: true, enum: Object.values(Sexe) },
    compteValideLe: Date,
    urlPhotoProfil: { type: String, required: true },
    dossier: { type: Schema.Types.ObjectId, ref: 'Dossier' },
    // uniteRecherche: { type: Schema.Types.ObjectId, ref: 'UniteRecherche', required: true },
    // encadreur: { type: Schema.Types.ObjectId, ref: 'Jury', required: true },
}, {
    timestamps: { createdAt: 'creeLe', updatedAt: 'misAJourLe' }
});

EtudiantSchema.pre("save",function(next){
    const user = this;
    if(this.isModified("motDePasse") || this.isNew){
        bcrypt.genSalt(10,function(saltError,salt){
            if(saltError){
                return next(saltError)
            }else{
                bcrypt.hash(user.motDePasse,salt,function(hashError,hash){
                    if(hashError){
                        return next(hashError)
                    }
                    user.motDePasse = hash;
                    console.log(user.motDePasse);
                    next()
                })
            }
        })
    }else{
        return next();
    }

});

EtudiantSchema.methods.verifyPassword = function(motDePasse,cb){
    bcrypt.compare(motDePasse,this.motDePasse,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    })
}


EtudiantSchema.virtual('dossierObj').get(async function() {
    return await Dossier.findById(this.dossier);
});

EtudiantSchema.virtual('sujet').get(async function() {
    return await this.dossierObj.sujet;
});


EtudiantSchema.virtual('notifications', {
    ref: 'Notification',
    localField: '_id',
    foreignField: 'destinataire'
});


/**
 * Envoyer une notification a l'administrateur
 */
// EtudiantSchema.post('save', async function(etudiant) {
//     console.log(ModelNotif);
//     await Notification.create({
//         type: TypeNotification.NOUVEAU_ETUDIANT,
//         destinataireModel: ModelNotif.ADMIN,
//         objetConcerne: etudiant._id,
//         objetConcerneModel: ModelNotif.ETUDIANT
//     });
// });


// Operations
EtudiantSchema.methods.changerEncadreur = async function(idNouveauEncadreur) {
    // if (this.niveau != Niveau.MASTER) {
    //     throw new Error("L'etudiant doit etre en Masteur pour avoir un encadreur");
    // }

    this.encadreur = idNouveauEncadreur;
    await this.save();
};

EtudiantSchema.methods.changerSujet = async function(nouveauSujet) {
    await this.dossierObj.changerSujet(nouveauSujet);
};

EtudiantSchema.methods.envoyerDossier = async function(destinataireId, destinataireModel) {
    await EnvoiDossier.create({
        dossier: this.dossier,
        envoyePar: this._id,
        envoyeParModel: ActeurDossier.ETUDIANT,
        destinataireId,
        destinataireModel
    });
}


module.exports = model('Etudiant', EtudiantSchema);
