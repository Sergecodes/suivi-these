const { Schema, model } = require('mongoose')
const isEmail = require( 'validator/lib/isEmail')
const Avis = require('./Avis')
const { AvisEmetteur, AvisDestinataire } = require('./types')


const CoordonateurSchema = new Schema({
    email: {
        type: String,
        required: true, 
        index: { unique: true },
        lowercase: true,
        trim: true,
        validate: {
            validator: email => isEmail(email),
            message: props => `${props.value} est un email invalide!`
        }
    },
    motDePasse: {
        type: String,
        required: true
    },  // todo encrypt before saving
    nom: { type: String, required: true }, 
    prenom: { type: String, required: true },
});


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


CoordonateurSchema.methods.programmerDateSoutenanceMaster = function(etudiant, date) {
    etudiant.dateSoutenance = date;
    etudiant.save();
};

CoordonateurSchema.methods.envoyerAvisTheseAdmin = function(
    type, 
    commentaire, 
    rapport, 
    dossierId
) {
    Avis.create({
        type,
        commentaire,
        rapport,
        dossier: dossierId,
        donnePar: this._id,
        donneParModel: AvisEmetteur.COORDONATEUR,
        destinataireModel: AvisDestinataire.ADMIN
    });
}


module.exports = model('Coordonateur', CoordonateurSchema);

