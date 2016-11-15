var Strategy = require('passport-http-bearer').Strategy;

var user = require('./user.js');

module.exports = new Strategy(
    function (token, cb) {
        user.loginWithToken(token)
            .then(function (user) {
                if (user) {
                    cb(null, user);
                } else cb(null, false);
            })
            .catch(function (err) {
                cb(err);
            });
    });
