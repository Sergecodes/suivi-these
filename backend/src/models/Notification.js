const { Schema, model } = require('mongoose')
const { ActeurNotif, Notification } = require('./types')


const NotificationSchema = new Schema({
    type: { 
        type: String, 
        required: true, 
        enum: [Notification.RAPPEL, ]
    },
    destinataire: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'destinataireModel'
    },
    destinataireModel: {
        type: String,
        required: true,
        enum: [
            ActeurNotif.COORDONATEUR, 
            ActeurNotif.EXPERT, 
            ActeurNotif.CONSEIL,
            ActeurNotif.JURY, 
            ActeurNotif.ETUDIANT, 
            ActeurNotif.RECTORAT,
            ActeurNotif.ADMIN
        ]
    },
    creeLe: { type: Date, default: Date.now, required: true },
    vueLe: Date
});


module.exports = model('Notification', NotificationSchema);

