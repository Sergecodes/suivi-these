const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');
const { Dossier, NoteDossier } = require('./Dossier');
const { GradeJury, ActeurDossier, AvisEmetteur, EtapeDossier } = require('./types')
const TypeAvis = require('./types').Avis;
const Avis = require('./Avis');
const { validerNumTel } = require('../validators');


const JurySchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    motDePasse: { type: String, required: true },
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
    numTelephone: {
        type: String,
        default: '',
        validate: {
            validator: numTel => validerNumTel(numTel),
            message: props => `${props.value} est un numero de telephone invalide!`
        }
    },
    grade: {
        type: Number,
        required: true,
        default: GradeJury.UN,
        enum: Object.values(GradeJury)
    },
    departement: { type: Schema.Types.ObjectId, ref: 'Departement', required: true }
});

JurySchema.pre("save", function (next) {
    const jury = this;
    if (this.isModified("motDePasse") || this.isNew) {
        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
                return next(saltError)
            } else {
                bcrypt.hash(jury.motDePasse, salt, function (hashError, hash) {
                    if (hashError) {
                        return next(hashError)
                    }
                    jury.motDePasse = hash;
                    console.log(jury.motDePasse);
                    return next();
                })
            }
        })
    } else {
        return next();
    }

})


JurySchema.virtual('encadre', {
    ref: 'Etudiant',
    localField: '_id',
    foreignField: 'encadreur'
});

JurySchema.virtual('etudiants', {
    ref: 'Etudiant',
    localField: '_id',
    foreignField: 'juges',
});


JurySchema.virtual('notifications', {
    ref: 'Notification',
    localField: '_id',
    foreignField: 'destinataire'
});


JurySchema.methods.verifierDejaNoter = async function (idDossier) {
    let numNotes = await NoteDossier.countDocuments({ notePar: this._id, dossier: idDossier });
    return numNotes === 0 ? false : true;
}


JurySchema.methods.attribuerNote = async function (idDossier, notes, commentaire) {
    let dejaNote = await this.verifierDejaNoter(idDossier);
    if (dejaNote)
        throw "Dossier deja note par ce membre du jury";

    // let avis = await Avis.create({
    //     type: valeur >= 30 ? TypeAvis.POSITIF : TypeAvis.NEGATIF ,
    //     commentaire,
    //     dossier: idDossier,
    //     donnePar: this._id,
    //     donneParModel: AvisEmetteur.JURY
    // });

    // If number of notes is 3, move dossier to the next step
    const numJuries = 3;
    let numNotes = await NoteDossier.countDocuments({ dossier: idDossier });
    console.log("nombre de notes", numNotes);

    if (numNotes >= numJuries) {
        throw `Le nombre maximum de notes pour un dossier est ${numJuries}`
    } else {
        await NoteDossier.create({
            dossier: idDossier,
            notes,
            notePar: this._id,
            noteParModel: ActeurDossier.JURY,
            commentaire
        });

        // Increment number of notes since we're just from adding a note
        numNotes += 1;

        // Increment step of dossier since all juries have given note to dossier
        if (numNotes === numJuries) {
            let dossier = await Dossier.findById(idDossier);
            await dossier.incrementerEtape(EtapeDossier.CINQ_MASTER);
        }
    }
}


JurySchema.methods.verifierAvisDonne = async function (idDossier) {
    let donne = await Avis.findOne({ donnePar: this._id, dossier: idDossier });
    return Boolean(donne);
}


JurySchema.methods.donnerAvisAdmin = async function (
    type,
    commentaire,
    rapport,
    idDossier
) {
    let donne = await this.verifierAvisDonne(idDossier);
    if (donne)
        throw "Ce membre de jury a deja envoye son avis a l'admin";

    await Avis.create({
        type,
        commentaire,
        rapport,
        dossier: idDossier,
        donnePar: this._id,
        donneParModel: AvisEmetteur.JURY
    });
}


JurySchema.set('toObject', { virtuals: true });
JurySchema.set('toJSON', { virtuals: true });


module.exports = model('Jury', JurySchema, 'juries');
