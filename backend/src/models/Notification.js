const { Schema, model } = require('mongoose')
const { ModelNotif, TypeNotification } = require('./types')


let acteursNotifs = Object.values(ModelNotif);

const NotificationSchema = new Schema({
    type: { 
        type: String, 
        required: true, 
        enum: Object.values(TypeNotification)
    },
    destinataire: {
        type: Schema.Types.ObjectId,
        // required: true,
        refPath: 'destinataireModel'
    },
    destinataireModel: {
        type: String,
        required: true,
        enum: acteursNotifs
    },
    objetConcerne: {
        type: Schema.Types.ObjectId,
        refPath: 'objetConcerneModel'
    },
    objetConcerneModel: {
        type: String,
        enum: acteursNotifs
    },
    message: String,
    creeLe: { type: Date, default: Date.now, required: true },
    vueLe: Date
});


module.exports = model('Notification', NotificationSchema);

