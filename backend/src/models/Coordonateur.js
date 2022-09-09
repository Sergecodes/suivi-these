const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail')
const Avis = require('./Avis')
const Notification = require('./Notification')
const { AvisEmetteur, EtapeDossier, TypeNotification, ModelNotif } = require('./types')
const { validerNumTel } = require('../validators');
const { sendEmail } = require('../utils');


const CoordonateurSchema = new Schema({
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
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    numTelephone: {
        type: String,
        default: '',
        validate: {
            validator: numTel => numTel !== '' ? validerNumTel(numTel) : true,
            message: props => `${props.value} est un numero de telephone invalide!`
        }
    }
});

CoordonateurSchema.pre("save", function (next) {
    const coordonateur = this;
    if (this.isModified("motDePasse") || this.isNew) {
        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
                return next(saltError)
            } else {
                bcrypt.hash(coordonateur.motDePasse, salt, function (hashError, hash) {
                    if (hashError) {
                        return next(hashError)
                    }
                    coordonateur.motDePasse = hash;
                    console.log(coordonateur.motDePasse);
                    next()
                })
            }
        })
    } else {
        return next();
    }

})

CoordonateurSchema.virtual('uniteRecherche', {
    ref: 'UniteRecherche',
    localField: '_id',
    foreignField: 'coordonateur',
    justOne: true
});

CoordonateurSchema.virtual('notifications', {
    ref: 'Notification',
    localField: '_id',
    foreignField: 'destinataire'
});


CoordonateurSchema.methods.programmerDateSoutenanceMaster = async function (etudiant, date) {
    etudiant.dateSoutenance = date;
    await etudiant.save();

    let etapeActu = await (await etudiant.getDossierObj()).getEtapeActuelle();
    console.log(typeof etapeActu);
    console.log('etapeActu', etapeActu);
    
    // Mark last etape as achevee
    if (etapeActu.numEtape === EtapeDossier.SIX_MASTER) {
        etapeActu.acheveeLe = new Date();
        etapeActu.save();

        await Notification.create({
            type: TypeNotification.SOUTENANCE_PROGRAMMEE,
            destinataire: etudiant._id,
            destinataireModel: ModelNotif.ETUDIANT,
            message: `Votre date de soutenance est le ${etudiant.dateSoutenance}`
        });

        if (process.env.SEND_EMAILS === "true") {
            sendEmail(
                etudiant.email, 
                'Date de soutenance programmée', 
                `Vous soutenez le ${etudiant.dateSoutenance}. Bon courage!`
            );
        }
    } else {
        throw "Ce dossier n'a pas encore atteint cette etape";
    } 
};

CoordonateurSchema.methods.verifierAvisDonne = async function (idDossier) {
    let donne = await Avis.findOne({ donnePar: this._id, dossier: idDossier });
    return Boolean(donne);
}

CoordonateurSchema.methods.donnerAvisTheseAdmin = async function (
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


CoordonateurSchema.set('toObject', { virtuals: true });
CoordonateurSchema.set('toJSON', { virtuals: true });


module.exports = model('Coordonateur', CoordonateurSchema);

