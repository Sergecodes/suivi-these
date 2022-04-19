const { Schema, model } = require('mongoose')


const UniteRechercheSchema = new Schema({
    code: { type: String, required: true, trim: true, index: { unique: true } },
    intitule: { type: String, required: true },
    coordonateur: { type: Schema.Types.ObjectId, ref: 'Coordonateur', required: true },
});


UniteRechercheSchema.virtual('etudiants', {
    ref: 'Etudiant',
    localField: '_id',
    foreignField: 'uniteRecherche'
});

UniteRechercheSchema.virtual('departements', {
    ref: 'Departement',
    localField: '_id',
    foreignField: 'uniteRecherche'
});


module.exports = model('UniteRecherche', UniteRechercheSchema, 'unites_recherche');

