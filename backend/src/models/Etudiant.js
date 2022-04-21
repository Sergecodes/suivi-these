const { Schema, model } = require('mongoose')
const isEmail = require('validator/lib/isEmail')
const { Niveau, Sexe, ActeurDossier } = require('./types')
const EnvoiDossier = require('./EnvoiDossier')
const Dossier = require('./Dossier')


const EtudiantSchema = new Schema({
    matricule: {
        type: String,
        required: true,
        index: true,
        // todo validate matricule; uppercase before saving
    },
    nom: { type: String, required: true }, 
    prenom: { type: String, required: true }, 
    motDePasse: {
        type: String,
        required: true
    },  // todo validate password length; encrypt password before saving (post method)
    niveau: { type: String, required: true, enum: Object.values(Niveau) },
    email: {
        type: String,
        required: true, 
        index: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: email => isEmail(email),
            message: props => `${props.value} est un email invalide!`
        }
    },
    dateNaissance: { type: Date, required: true },
    dateSoutenance: Date,
    lieuNaissance: { type: String, required: true }, 
    numTelephone: { type: String, required: true }, 
    sexe: { type: String, required: true, enum: Object.values(Sexe) },
    compteValideLe: Date,
    urlPhotoProfil: { type: String, required: true },
    dossier: { type: Schema.Types.ObjectId, ref: 'Dossier' },
    uniteRecherche: { type: Schema.Types.ObjectId, ref: 'UniteRecherche', required: true },
    encadreur: { type: Schema.Types.ObjectId, ref: 'Jury', required: true },
}, {
    timestamps: { createdAt: 'creeLe', updatedAt: 'misAJourLe' }
});


EtudiantSchema.virtual('dossierObj').get(function() {
    return Dossier.findById(this.dossier);
});

EtudiantSchema.virtual('sujet').get(function() {
    return this.dossierObj.sujet;
});


EtudiantSchema.virtual('notifications', {
    ref: 'Notification',
    localField: '_id',
    foreignField: 'destinataire'
});


// Operations
EtudiantSchema.methods.changerEncadreur = function(nouveauEncadreurId) {
    // if (this.niveau != Niveau.MASTER) {
    //     throw new Error("L'etudiant doit etre en Masteur pour avoir un encadreur");
    // }

    this.encadreur = nouveauEncadreurId;
    this.save();
};

EtudiantSchema.methods.changerSujet = function(nouveauSujet) {
    this.dossierObj.changerSujet(nouveauSujet);
};

EtudiantSchema.methods.envoyerDossier = function(destinataireId, destinataireModel) {
    EnvoiDossier.create({
        dossier: this.dossier,
        envoyePar: this._id,
        envoyeParModel: ActeurDossier.ETUDIANT,
        destinataireId,
        destinataireModel
    }, function (err, envDossier) {
        if (err) return console.error(err);
        console.log("Dossier envoye");
    });
}


module.exports = model('Etudiant', EtudiantSchema);
