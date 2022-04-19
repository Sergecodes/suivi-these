const { Schema, model } = require('mongoose')
const isEmail = require('validator/lib/isEmail')
const { GradeJury } = require('./types')


const JurySchema = new Schema({
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
    telephone: { type: String, required: true },
    grade: { 
        type: Number, 
        required: true, 
        default: GradeJury.UN,  
        enum: Object.values(GradeJury)
    },
});


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


module.exports = model('Jury', JurySchema, 'juries');

