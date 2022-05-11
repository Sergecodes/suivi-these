const { Schema, model } = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { NoteDossier } = require('./Dossier');
const Avis = require('./Avis');
const bcrypt = require('bcrypt');
const { GradeJury, ActeurDossier, AvisEmetteur } = require('./types')


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

JurySchema.virtual('notifications', {
    ref: 'Notification',
    localField: '_id',
    foreignField: 'destinataire'
});


JurySchema.methods.attribuerNote = async function(dossier, categorie, valeur) {
    await NoteDossier.create({
        dossier,
        categorie,
        valeur,
        notePar: this._id,
        noteParModel: ActeurDossier.JURY
    });
}   

JurySchema.methods.donnerAvisAdmin = async function(
    type, 
    commentaire, 
    rapport, 
    idDossier
) {
    await Avis.create({
        type,
        commentaire,
        rapport,
        dossier: idDossier,
        donnePar: this._id,
        donneParModel: AvisEmetteur.JURY
    });
}


module.exports = model('Jury', JurySchema, 'juries');

