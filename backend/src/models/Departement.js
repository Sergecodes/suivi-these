const { Schema, model } = require('mongoose')
const isEmail = require('validator/lib/isEmail')
const bcrypt = require('bcrypt');
const Notification = require('./Notification');
const { StatutDossier, ModelNotif, TypeNotification, AvisEmetteur  } = require('./types')
const TypeAvis = require('./types').Avis;
const Avis = require('./Avis');


const DepartementSchema = new Schema({
    nom: { type: String, required: true },
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
    uniteRecherche: { type: Schema.Types.ObjectId, ref: 'UniteRecherche', required: true },
});


DepartementSchema.pre("save",function(next){
    const departement = this;
    if(this.isModified("motDePasse") || this.isNew){
        bcrypt.genSalt(10,function(saltError,salt){
            if(saltError){
                return next(saltError)
            }else{
                bcrypt.hash(departement.motDePasse,salt,function(hashError,hash){
                    if(hashError){
                        return next(hashError)
                    }
                    departement.motDePasse = hash;
                    console.log(departement.motDePasse);
                    next()
                })
            }
        })
    }else{
        return next();
    }
});


DepartementSchema.virtual('juries', {
    ref: 'Jury',
    localField: '_id',
    foreignField: 'departement'
});


DepartementSchema.virtual('etudiants', {
    ref: 'Etudiant',
    localField: '_id',
    foreignField: 'departement'
});


DepartementSchema.virtual('notifications', {
    ref: 'Notification',
    localField: '_id',
    foreignField: 'destinataire'
});


/**
 * Rejeter le dossier d'un etudiant
 * @param dossier: L'objet document
 * @param raison
 */
 DepartementSchema.methods.validerDossier = async function (dossier) {
    dossier.statut = StatutDossier.VALIDE_DEPARTEMENT;
    await dossier.incrementerEtape();
    // No need to call save() since the method above saves the dossier object
    // await dossier.save();

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
 * Rejeter le dossier d'un etudiant
 * @param dossier: L'objet document
 * @param raison
 */
 DepartementSchema.methods.rejeterDossier = async function (dossier, raison) {
    dossier.statut = StatutDossier.REJETE_DEPARTEMENT;
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


DepartementSchema.methods.verifierAvisDonne = async function(idDossier) {
    let donne = await Avis.findOne({ donnePar: this._id, dossier: idDossier });
    return Boolean(donne);
}   


DepartementSchema.methods.donnerAvisAdmin = async function(
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


DepartementSchema.set('toObject', { virtuals: true });
DepartementSchema.set('toJSON', { virtuals: true });


module.exports = model('Departement', DepartementSchema);
