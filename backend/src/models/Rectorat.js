const { Schema, model } = require('mongoose')
const isEmail = require('validator/lib/isEmail')


const RectoratSchema = new Schema({
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
    }
});


RectoratSchema.virtual('notifications', {
    ref: 'Notification',
    localField: '_id',
    foreignField: 'destinataire'
});


module.exports = model('Rectorat', RectoratSchema);
