

exports.logout = function(req, res) {
    if (req.session)
        req.session.destroy();

    res.send("Logged out");
}

