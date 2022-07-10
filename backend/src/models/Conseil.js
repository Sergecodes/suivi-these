const { Schema, model } = require('mongoose')
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');
const Avis = require('./Avis');
const { validerNumTel } = require('../validators');
const { AvisEmetteur } = require('./types')


const ConseilSchema = new Schema({
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

ConseilSchema.pre("save", function (next) {
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
                    next()
                })
            }
        })
    } else {
        return next();
    }

})


ConseilSchema.virtual('notifications', {
    ref: 'Notification',
    localField: '_id',
    foreignField: 'destinataire'
});

ConseilSchema.methods.verifierAvisDonne = async function (idDossier) {
    let donne = await Avis.findOne({ donnePar: this._id, dossier: idDossier });
    return Boolean(donne);
}

ConseilSchema.methods.donnerAvisTheseAdmin = async function (
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
        donneParModel: AvisEmetteur.CONSEIL
    });
}


ConseilSchema.set('toObject', { virtuals: true });
ConseilSchema.set('toJSON', { virtuals: true });


module.exports = model('Conseil', ConseilSchema);

