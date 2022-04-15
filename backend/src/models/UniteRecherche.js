import { Schema } from 'mongoose'


const UniteRechercheSchema = new Schema({
    code: { type: String, required: true, trim: true, index: { unique: true } },
    intitule: { type: String, required: true },
    coordonateur: { type: Schema.Types.ObjectId, ref: 'Coordonateur', required: true },
});


const UniteRecherche = mongoose.model('UniteRecherche', UniteRechercheSchema);

export default UniteRecherche;

