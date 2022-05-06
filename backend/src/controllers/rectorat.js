const { Types, EMAILS_RECTORAT } = require('../constants');


exports.login_rectorat = function(req,res){
	const {email, code} = req.body;

    if (!EMAILS_RECTORAT.includes(email)) 
        res.status(400).send("Invalid credentials");

    if (code !== process.env.RECTORAT_SECRET) 
        res.status(400).send("Invalid credentials");
    
    // Create user session
    req.session.user = {
        _id: '',
        model: Types.ACTEURS.RECTORAT
    };

    res.json({
        success: true,
        message: "Connexion reussie"
    });
}
