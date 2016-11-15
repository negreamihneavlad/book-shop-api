var user = require('../services/user.js');

module.exports = {
    login: login,
    signUp: signUp
}

function login(req, res) {
    user.loginWithEmail(req.body)
        .then(function(user) {
            res.set('Authorization', user.token);
            res.set('Access-Control-Expose-Headers', 'Authorization');
            res.json(user);
        })
        .catch(function(err) {
            res.status(500).send(err);
        });

}

function signUp(req, res) {
    user.signUp(req.body)
        .then(function(user) {
            res.json(user);
        })
        .catch(function(err) {
            res.status(500).send(err);
        });
}
