const { Schema, model } = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');
const Notification = require('./Notification');
const { ModelNotif, AvisEmetteur, TypeNotification } = require('./types');


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
    motDePasse: { type: String, required: true }
});

RectoratSchema.pre("save",function(next){
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


RectoratSchema.virtual('notifications', {
    ref: 'Notification',
    localField: '_id',
    foreignField: 'destinataire'
});


RectoratSchema.methods.programmerDateSoutenanceThese = async function(etudiant, date) {
    etudiant.dateSoutenance = date;
    await etudiant.save();

    // todo also update etape
    
    await Notification.create({
        type: TypeNotification.SOUTENANCE_PROGRAMMEE,
        destinataire: etudiant._id,
        destinataireModel: ModelNotif.ETUDIANT,
        message: `Votre date de soutenance est le ${etudiant.dateSoutenance}`
    });
};

// RectoratSchema.methods.donnerAvisTheseAdmin = async function(
//     type, 
//     commentaire, 
//     rapport, 
//     idDossier
// ) {
//     await Avis.create({
//         type,
//         commentaire,
//         rapport,
//         dossier: idDossier,
//         donnePar: this._id,
//         donneParModel: AvisEmetteur.
//     });
// }

module.exports = model('Rectorat', RectoratSchema, 'rectorat');

