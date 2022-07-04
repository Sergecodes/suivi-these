const { Schema, model } = require('mongoose')
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');
const Notification = require('./Notification');
const { ActeurDossier, ModelNotif, TypeNotification, EtapeDossier } = require('./types');


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
    const admin = this;
    if(this.isModified("motDePasse") || this.isNew){
        bcrypt.genSalt(10,function(saltError,salt){
            if(saltError){
                return next(saltError)
            }else{
                bcrypt.hash(admin.motDePasse,salt,function(hashError,hash){
                    if(hashError){
                        return next(hashError)
                    }
                    admin.motDePasse = hash;
                    console.log(admin.motDePasse);
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
    dossier.rejeteParActeur = ActeurDossier.ADMIN;
    dossier.raisonRejet = raison;
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

AdminSchema.methods.accepterDossier = async function (dossier) {
    await dossier.incrementerEtape(EtapeDossier.DEUX_THESE);

    // Notifier l'etudiant
    await Notification.create({
        type: TypeNotification.DOSSIER_VALIDE,
        destinataire: dossier.etudiant,
        destinataireModel: ModelNotif.ETUDIANT,
        objetConcerne: dossier._id,
        objetConcerneModel: ModelNotif.DOSSIER
    });
}

/**
 * Valider l'inscription d'un etudiant
 */
 AdminSchema.methods.accepterEtudiant = async function (etudiant) {
    etudiant.compteValideLe = new Date();
    await etudiant.save();
    await etudiant.incrementerEtape(EtapeDossier.UNE);
    
    await Notification.create({
        type: TypeNotification.COMPTE_VALIDE,
        destinataire: etudiant,
        destinataireModel: ModelNotif.ETUDIANT,
        objetConcerne: etudiant._id,
        objetConcerneModel: ModelNotif.ETUDIANT,
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


AdminSchema.set('toObject', { virtuals: true });
AdminSchema.set('toJSON', { virtuals: true });


module.exports = model('Admin', AdminSchema, 'admin');

