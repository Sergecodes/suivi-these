const { Schema, model } = require('mongoose')
const isEmail = require('validator/lib/isEmail')
const Avis = require('./Avis')
const bcrypt = require('bcrypt');
const { TypeExpert, GradeExpert, AvisEmetteur } = require('./types')


const ExpertSchema = new Schema({
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
    ville: { type: String, required: true }, 
    grade: { 
        type: String, 
        required: true, 
        default: GradeExpert.UN,
        enum: Object.values(GradeExpert)
    }, 
    type: { 
        type: String, 
        default: TypeExpert.INTERNE, 
        enum: Object.values(TypeExpert)
    }
});

ExpertSchema.pre("save",function(next){
    const expert = this;
    if(this.isModified("motDePasse") || this.isNew){
        bcrypt.genSalt(10,function(saltError,salt){
            if(saltError){
                return next(saltError)
            }else{
                bcrypt.hash(expert.motDePasse,salt,function(hashError,hash){
                    if(hashError){
                        return next(hashError)
                    }
                    expert.motDePasse = hash;
                    console.log(expert.motDePasse);
                    next()
                })
            }
        })
    }else{
        return next();
    }

})


ExpertSchema.virtual('notifications', {
    ref: 'Notification',
    localField: '_id',
    foreignField: 'destinataire'
});


ExpertSchema.methods.verifierAvisDonne = async function(idDossier) {
    let donne = await Avis.findOne({ donnePar: this._id, dossier: idDossier });
    return Boolean(donne);
}   


ExpertSchema.methods.donnerAvisAdmin = async function(
    type, 
    commentaire, 
    rapport, 
    idDossier
) {
    let donne = await this.verifierAvisDonne(idDossier);
    if (donne)
        throw "Ce membre de jury a deja envoye son avis a l'admin";

    await Avis.create({
        type,
        commentaire,
        rapport,
        dossier: idDossier,
        donnePar: this._id,
        donneParModel: AvisEmetteur.JURY
    });
}


module.exports = model('Expert', ExpertSchema);


