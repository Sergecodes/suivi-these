const { Types, EMAILS_ADMIN } = require('../constants');


exports.login_admin = function(req,res){
	const {email, code} = req.body;

    if (!EMAILS_ADMIN.includes(email)) 
        res.status(400).send("Invalid credentials");

    if (code !== process.env.ADMIN_SECRET) 
        res.status(400).send("Invalid credentials");
    
    // Create user session
    req.session.user = {
        _id: '',
        model: Types.ACTEURS.ADMIN
    };

    res.json({
        success: true,
        message: "Connexion reussie"
    });
}
