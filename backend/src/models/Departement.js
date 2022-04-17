const { Schema, model } = require('mongoose')
const isEmail = require('validator/lib/isEmail')


const DepartementSchema = new Schema({
    nom: { type: String, required: true },
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
    uniteRecherche: { type: Schema.Types.ObjectId, ref: 'UniteRecherche', required: true },
});


DepartementSchema.virtual('notifications', {
    ref: 'Notification',
    localField: '_id',
    foreignField: 'destinataire'
});


module.exports = model('Departement', DepartementSchema);
