import { Schema } from 'mongoose'
// todo install validator
import isEmail from 'validator/lib/isEmail';


const AdminSchema = new Schema({
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
});


AdminSchema.virtual('notifications', {
    ref: 'Notification',
    localField: '_id',
    foreignField: 'destinataire'
});


const Admin = mongoose.model('Admin', AdminSchema);


export default Admin;

