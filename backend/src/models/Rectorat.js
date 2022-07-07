const { Schema, model } = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');
const Notification = require('./Notification');
const Avis = require('./Avis');
const { validerNumTel } = require('../validators');
const { ModelNotif, AvisEmetteur, TypeNotification, EtapeDossier } = require('./types');


const RectoratSchema = new Schema({
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
            validator: numTel => validerNumTel(numTel),
            message: props => `${props.value} est un numero de telephone invalide!`
        }
    },
});

RectoratSchema.pre("save", function (next) {
    const conseil = this;
    if (this.isModified("motDePasse") || this.isNew) {
        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
                return next(saltError)
            } else {
                bcrypt.hash(conseil.motDePasse, salt, function (hashError, hash) {
                    if (hashError) {
                        return next(hashError)
                    }
                    conseil.motDePasse = hash;
                    console.log(conseil.motDePasse);
                    return next();
                })
            }
        })
    } else {
        return next();
    }

})


RectoratSchema.virtual('notifications', {
    ref: 'Notification',
    localField: '_id',
    foreignField: 'destinataire'
});


RectoratSchema.methods.programmerDateSoutenanceThese = async function (etudiant, date) {
    etudiant.dateSoutenance = date;
    await etudiant.save();
    await etudiant.incrementerEtape(EtapeDossier.NEUF_THESE);

    await Notification.create({
        type: TypeNotification.SOUTENANCE_PROGRAMMEE,
        destinataire: etudiant._id,
        destinataireModel: ModelNotif.ETUDIANT,
        objetConcerne: etudiant._id,
        objetConcerneModel: ModelNotif.ETUDIANT,
        message: `Votre date de soutenance est le ${etudiant.dateSoutenance}`
    });
};


RectoratSchema.methods.verifierAvisDonne = async function (idDossier) {
    let donne = await Avis.findOne({ donnePar: this._id, dossier: idDossier });
    return Boolean(donne);
}

RectoratSchema.methods.donnerAvisTheseAdmin = async function (
    type,
    commentaire,
    rapport,
    idDossier
) {
    let donne = await this.verifierAvisDonne(idDossier);
    if (donne)
        throw "Vous avez deja envoye votre avis a l'admin";

    await Avis.create({
        type,
        commentaire,
        rapport,
        dossier: idDossier,
        donnePar: this._id,
        donneParModel: AvisEmetteur.COORDONATEUR
    });
}


RectoratSchema.set('toObject', { virtuals: true });
RectoratSchema.set('toJSON', { virtuals: true });


module.exports = model('Rectorat', RectoratSchema, 'rectorat');

