const { Schema, model } = require('mongoose')
const isEmail = require('validator/lib/isEmail')
const bcrypt = require('bcrypt');


const DepartementSchema = new Schema({
    nom: { type: String, required: true },
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
    uniteRecherche: { type: Schema.Types.ObjectId, ref: 'UniteRecherche', required: true },
});


DepartementSchema.pre("save",function(next){
    const departement = this;
    if(this.isModified("motDePasse") || this.isNew){
        bcrypt.genSalt(10,function(saltError,salt){
            if(saltError){
                return next(saltError)
            }else{
                bcrypt.hash(departement.motDePasse,salt,function(hashError,hash){
                    if(hashError){
                        return next(hashError)
                    }
                    departement.motDePasse = hash;
                    console.log(departement.motDePasse);
                    next()
                })
            }
        })
    }else{
        return next();
    }
});


DepartementSchema.virtual('juries', {
    ref: 'Jury',
    localField: '_id',
    foreignField: 'departement'
});


DepartementSchema.virtual('etudiants', {
    ref: 'Etudiant',
    localField: '_id',
    foreignField: 'departement'
});


DepartementSchema.virtual('notifications', {
    ref: 'Notification',
    localField: '_id',
    foreignField: 'destinataire'
});


module.exports = model('Departement', DepartementSchema);
