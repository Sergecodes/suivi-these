const { Schema, model } = require('mongoose')


const UniteRechercheSchema = new Schema({
    code: { type: String, required: true, trim: true, index: { unique: true } },
    intitule: { type: String, required: true },
    coordonateur: { type: Schema.Types.ObjectId, ref: 'Coordonateur', required: true },
});


module.exports = model('UniteRecherche', UniteRechercheSchema, 'unites_recherche');

