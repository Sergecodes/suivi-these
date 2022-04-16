const { Schema, model } = require('mongoose')
const isEmail = require('validator/lib/isEmail')
const { TypeExpert, GradeExpert } = require('./types')


const ExpertSchema = new Schema({
    nom: { type: String, required: true }, 
    prenom: { type: String, required: true }, 
    motDePasse: {
        type: String,
        required: true
    },  // todo validate password length; encrypt password before saving (post method)
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
    ville: { type: String, required: true }, 
    grade: { 
        type: String, 
        required: true, 
        default: GradeExpert.UN,
        enum: [GradeExpert.UN, GradeExpert.DEUX, GradeExpert.TROIS]
    }, 
    type: { 
        type: String, 
        default: TypeExpert.INTERNE, 
        enum: [TypeExpert.EXTERNE, TypeExpert.INTERNE] 
    }
});


ExpertSchema.virtual('notifications', {
    ref: 'Notification',
    localField: '_id',
    foreignField: 'destinataire'
});


module.exports = model('Expert', ExpertSchema);


