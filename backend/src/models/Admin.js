const { Schema, model } = require('mongoose')
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');
const Notification = require('./Notification');
const { StatutDossier, ModelNotif, TypeNotification } = require('./types')


const AdminSchema = new Schema({
    email: {
        type: String,
        required: true, 
        index: { unique: true },
        trim: true,
        validate: {
            validator: email => isEmail(email),
            message: props => `${props.value} est un email invalide!`
        }
    },
    motDePasse: { type: String, required: true }
});

AdminSchema.pre("save",function(next){
    const conseil = this;
    if(this.isModified("motDePasse") || this.isNew){
        bcrypt.genSalt(10,function(saltError,salt){
            if(saltError){
                return next(saltError)
            }else{
                bcrypt.hash(conseil.motDePasse,salt,function(hashError,hash){
                    if(hashError){
                        return next(hashError)
                    }
                    conseil.motDePasse = hash;
                    console.log(conseil.motDePasse);
                    next()
                })
            }
        })
    }else{
        return next();
    }

})


AdminSchema.virtual('notifications', {
    ref: 'Notification',
    localField: '_id',
    foreignField: 'destinataire'
});



/**
 * Rejeter le dossier d'un etudiant
 * @param dossier: L'objet document
 * @param raison
 */
AdminSchema.methods.rejeterDossier = async function (dossier, raison) {
    dossier.statut = StatutDossier.REJETE_ADMIN;
    dossier.raisonStatut = raison;
    await dossier.save();

    // Notifier l'etudiant
    await Notification.create({
        type: TypeNotification.DOSSIER_REJETE,
        destinataire: dossier.etudiant,
        destinataireModel: ModelNotif.ETUDIANT,
        objetConcerne: dossier._id,
        objetConcerneModel: ModelNotif.DOSSIER
    });
}


/**
 * Rejeter l'inscription d'un etudiant
 * @param etudiant: L'objet document
 * @param raison
 */
 AdminSchema.methods.rejeterEtudiant = async function (etudiant, raison) {
    // Notifier l'etudiant
    await Notification.create({
        type: TypeNotification.COMPTE_REJETE,
        destinataire: etudiant,
        destinataireModel: ModelNotif.ETUDIANT,
        objetConcerne: etudiant._id,
        objetConcerneModel: ModelNotif.ETUDIANT,
        message: raison
    });
}


module.exports = model('Admin', AdminSchema, 'admin');

