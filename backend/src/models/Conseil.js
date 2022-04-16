const { Schema, model } = require('mongoose')
const isEmail = require('validator/lib/isEmail');


const ConseilSchema = new Schema({
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
});


ConseilSchema.virtual('notifications', {
    ref: 'Notification',
    localField: '_id',
    foreignField: 'destinataire'
});


module.exports = model('Conseil', ConseilSchema);

