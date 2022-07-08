const Unite = require('../models/UniteRecherche');


exports.getAll = async function (req, res) {
	res.json( await Unite.find({}) );
}

exports.getOne = function (req, res) {
	const { unite } = res.locals;
	res.json(unite);
}

exports.update = async function (req, res) {
  // Info: code, intitule, idCoordonateur
  const unite = await Unite.findById(req.params.id);
  unite.code = req.body.code || unite.code;
  unite.intitule = req.body.intitule || unite.intitule;
  unite.coordonateur = req.body.idCoordonateur || unite.coordonateur;

	unite.save((err, newUnite) => {
		if (err) {
         console.error(err);
         res.status(500).json(err)
      }

      res.json(newUnite);
	});
}

exports.delete = function (req, res) {
	Unite.findByIdAndRemove(req.params.id, (err, doc) => {
		if (!doc) {
			return res.status(404).send("Not found");
		}

		if (err) {
			console.error(err);
			return res.status(500).json(err);
		}

		return res.status(204).send("Succes");
	});
}

exports.register_unite = function(req,res){
  let unite = new Unite();
  unite.intitule = req.body.intitule;
  unite.coordonateur = req.body.coordonateur;
  unite.code = req.body.code;

  unite.save(function(err,nouveau_unite){
     if(err){
        console.error("erreur lors de l'enregistrement dun unite: ",err);
        return res.status(500).json({success:false,message:"quelque chose s'est mal passer lors de l'enregistrement d'un nouveau conseil scientifique",error:err})
     }

      res.status(201).json({
          success: true,
          message: "Enregistre avec succes",
          data: nouveau_unite.toJSON()
      });
  })
}

