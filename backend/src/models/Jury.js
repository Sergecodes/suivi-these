const { Schema, model } = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { NoteDossier } = require('./Dossier');
const { GradeJury, ActeurDossier, AvisEmetteur } = require('./types')
const TypeAvis = require('./types').Avis;
const Avis = require('./Avis');
const bcrypt = require('bcrypt');


const JurySchema = new Schema({
    nom: { type: String, required: true }, 
    prenom: { type: String, required: true }, 
    motDePasse: { type: String, required: true },
    email: {
        type: String,
        required: true, 
        index: { unique: true },
        trim: true,
        validate: {
            validator: email => isEmail(email),
            message: props => `${props.value} est un email invalide!`
        }
    },
    telephone: { type: String, required: true },
    grade: { 
        type: Number, 
        required: true, 
        default: GradeJury.UN,  
        enum: Object.values(GradeJury)
    },
    departement: { type: Schema.Types.ObjectId, ref: 'Departement', required: true }
});

JurySchema.pre("save",function(next){
    const jury = this;
    if(this.isModified("motDePasse") || this.isNew){
        bcrypt.genSalt(10,function(saltError,salt){
            if(saltError){
                return next(saltError)
            }else{
                bcrypt.hash(jury.motDePasse,salt,function(hashError,hash){
                    if(hashError){
                        return next(hashError)
                    }
                    jury.motDePasse = hash;
                    console.log(jury.motDePasse);
                    next()
                })
            }
        })
    }else{
        return next();
    }

})


JurySchema.virtual('encadre', {
    ref: 'Etudiant',
    localField: '_id',
    foreignField: 'encadreur'
});

JurySchema.virtual('etudiants', {
    ref: 'Etudiant',
    localField: '_id',
    foreignField: 'juges',
});


JurySchema.virtual('notifications', {
    ref: 'Notification',
    localField: '_id',
    foreignField: 'destinataire'
});


JurySchema.methods.verifierDejaNoter = async function(idDossier) {
    let note = await NoteDossier.findOne({ notePar: this._id, dossier: idDossier });
    return Boolean(note);
}   


JurySchema.methods.attribuerNote = async function(idDossier, categorie, valeur, commentaire) {
    let dejaNote = await this.verifierDejaNoter(idDossier);
    if (dejaNote)
        throw "Dossier deja note par ce membre du jury";

    let avis = await Avis.create({
        type: valeur >= 30 ? TypeAvis.POSITIF : TypeAvis.NEGATIF ,
        commentaire,
        dossier: idDossier,
        donnePar: this._id,
        donneParModel: AvisEmetteur.JURY
    });

    await NoteDossier.create({
        avis: avis._id,
        dossier: idDossier,
        categorie,
        valeur,
        notePar: this._id,
        noteParModel: ActeurDossier.JURY
    });

}   

// JurySchema.methods.verifierAvisDonne = async function(idDossier) {
//     let donne = await Avis.findOne({ donnePar: this._id, dossier: idDossier });
//     return Boolean(donne);
// }   


// JurySchema.methods.donnerAvisAdmin = async function(
//     type, 
//     commentaire, 
//     rapport, 
//     idDossier
// ) {
//     let donne = await this.verifierDejaNoter(idDossier);
//     if (donne)
//         throw "Ce membre de jury a deja envoye son avis a l'admin";

//     await Avis.create({
//         type,
//         commentaire,
//         rapport,
//         dossier: idDossier,
//         donnePar: this._id,
//         donneParModel: AvisEmetteur.JURY
//     });
// }


module.exports = model('Jury', JurySchema, 'juries');

