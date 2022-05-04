/** Fonctions communes a plusieurs acteurs */

exports.logout = function(req, res) {
    console.log(req.session);
    req.session.destroy();
    console.log(req.session);
}


/**
 * req.body: m
 */
exports.login = function(req, res) {
    console.log(req.session);
    req.session.destroy();
    console.log(req.session);
}

