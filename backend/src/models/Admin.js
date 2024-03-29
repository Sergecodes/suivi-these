const { Schema, model } = require('mongoose')
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');
const Notification = require('./Notification');
const { validerNumTel } = require('../validators');
const { 
    ActeurDossier, ModelNotif, TypeNotification, EtapeDossier 
} = require('./types');
const { sendEmail } = require('../utils');


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
    motDePasse: { type: String, required: true },
    numTelephone: {
        type: String,
        default: '',
        validate: {
            validator: numTel => numTel !== '' ? validerNumTel(numTel) : true,
            message: props => `${props.value} est un numero de telephone invalide!`
        }
    }
});

AdminSchema.pre("save", function (next) {
    const admin = this;
    if (this.isModified("motDePasse") || this.isNew) {
        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
                return next(saltError)
            } else {
                bcrypt.hash(admin.motDePasse, salt, function (hashError, hash) {
                    if (hashError) {
                        return next(hashError)
                    }
                    admin.motDePasse = hash;
                    console.log(admin.motDePasse);
                    next()
                })
            }
        })
    } else {
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
    dossier.rejeteLe = new Date();
    await dossier.save();

    let etud = await dossier.getEtudiantObj();

    // Notifier l'etudiant et envoyer un email
    await Notification.create({
        type: TypeNotification.DOSSIER_REJETE,
        destinataire: etud._id,
        destinataireModel: ModelNotif.ETUDIANT,
        objetConcerne: dossier._id,
        objetConcerneModel: ModelNotif.DOSSIER
    });

    if (process.env.SEND_EMAILS === "true") {
        sendEmail(
            etud.email, 
            'Dossier rejeté', 
            `Votre dossier a été rejeté par le <strong>CRFD-STG</strong>! <br> 
            Vous trouverez le rapport ci-dessous: <br><br> ${raison}`
        );
    }
}

AdminSchema.methods.accepterDossier = async function (dossier) {
    await dossier.incrementerEtape(EtapeDossier.TROIS_THESE);

    let etud = await dossier.getEtudiantObj();

    // Notifier l'etudiant
    await Notification.create({
        type: TypeNotification.DOSSIER_VALIDE,
        destinataire: etud._id,
        destinataireModel: ModelNotif.ETUDIANT,
        objetConcerne: dossier._id,
        objetConcerneModel: ModelNotif.DOSSIER
    });

    if (process.env.SEND_EMAILS === "true") {
        sendEmail(
            etud.email, 
            'Dossier validé', 
            `Votre dossier a été validé par <strong>l'Ecole Doctorale</strong>. <br>
            Veuillez vous connecter sur la plateforme pour suivre son évolution.`
        );
    }
}

/**
 * Valider l'inscription d'un etudiant
 */
AdminSchema.methods.accepterEtudiant = async function (etudiant) {
    etudiant.compteValideLe = new Date();
    await etudiant.save();

    await Notification.create({
        type: TypeNotification.COMPTE_VALIDE,
        destinataire: etudiant._id,
        destinataireModel: ModelNotif.ETUDIANT,
        objetConcerne: etudiant._id,
        objetConcerneModel: ModelNotif.ETUDIANT,
    });

    if (process.env.SEND_EMAILS === "true") {
        sendEmail(
            etudiant.email, 
            'Compte validé', 
            `Votre demande de creation de compte a été validé. <br>
            Veuillez vous connecter sur la plateforme pour uploader votre dossier.`
        );
    }
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

    if (process.env.SEND_EMAILS === "true") {
        sendEmail(
            etudiant.email, 
            'Compte rejeté', 
            `Votre demande de creation de compte a été rejeté. <br>
            Vous trouverez le rapport ci-dessous: <br><br> ${raison}`
        );
    }
}

/**
 * Valider la notation des jurys
 */
AdminSchema.methods.validerNotation = async function (dossier) {
    await dossier.incrementerEtape(EtapeDossier.SIX_MASTER);
    if (process.env.SEND_EMAILS === "true") {
        await dossier.populate('etudiant', 'email');
        sendEmail(
            dossier.etudiant.email, 
            'Notation des jurys validée', 
            `Félicitations, apres l'évaluation de la notation des jurys, 
            votre dossier a été validé. <br> Veuillez patienter pour la programmation de 
            votre date de soutenance.`
        );
    }
}


AdminSchema.set('toObject', { virtuals: true });
AdminSchema.set('toJSON', { virtuals: true });


module.exports = model('Admin', AdminSchema, 'admin');

