import { Schema } from 'mongoose'
import isEmail from 'validator/lib/isEmail'
import { GradeJury } from './types';


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
            message: `{VALUE} est un email invalide`
        }
    },
    telephone: { type: String, required: true },
    grade: { 
        type: Number, 
        required: true, 
        default: GradeJury.UN,  
        enum: [GradeJury.UN, GradeJury.DEUX, GradeJury.TROIS]
    },
});


JurySchema.virtual('encadres', {
    ref: 'Etudiant',
    localField: '_id',
    foreignField: 'encadreur'
});

JurySchema.virtual('notifications', {
    ref: 'Notification',
    localField: '_id',
    foreignField: 'destinataire'
});


const Jury = mongoose.model('Jury', JurySchema);

export default Jury;

