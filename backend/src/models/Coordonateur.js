import { Schema } from 'mongoose'
// todo install validator
import isEmail from 'validator/lib/isEmail';


const CoordonateurSchema = new Schema({
    email: {
        type: String,
        required: true, 
        index: { unique: true },
        lowercase: true,
        trim: true,
        validate: {
            validator: email => isEmail(email),
            message: `{VALUE} est un email invalide`
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


const Coordonateur = mongoose.model('Coordonateur', CoordonateurSchema);


export default Coordonateur;

