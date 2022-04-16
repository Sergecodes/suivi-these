const { Schema, model } = require('mongoose')
const isEmail = require( 'validator/lib/isEmail');


const CoordonateurSchema = new Schema({
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
    motDePasse: {
        type: String,
        required: true
    },  // todo encrypt before saving
    nom: { type: String, required: true }, 
    prenom: { type: String, required: true },
});


CoordonateurSchema.virtual('uniteRecherche', {
    ref: 'UniteRecherche',
    localField: '_id',
    foreignField: 'coordonateur'
});

CoordonateurSchema.virtual('notifications', {
    ref: 'Notification',
    localField: '_id',
    foreignField: 'destinataire'
});


module.exports = model('Coordonateur', CoordonateurSchema);

