module.exports = {
    login: login,
    signUp: signUp,
    update: update,
    updatePassword: updatePassword,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword
};

var user = require('../services/user.js');
var mail = require('../services/mail.js');

/**
 * Searches for user email and password
 *
 * @param req
 * @param res
 */
function login(req, res) {
    user.loginWithEmail(req.body)
        .then(function (user) {
            res.set('Authorization', user.authToken);
            res.set('Access-Control-Expose-Headers', 'Authorization');
            res.json(user);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}
/**
 * Add a new user
 *
 * @param req
 * @param res
 */
function signUp(req, res) {
    user.signUp(req.body)
        .then(function (user) {
            res.json(user);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}
/**
 * Edit user details
 *
 * @param req
 * @param res
 */
function update(req, res) {
    user.update(req.user.id, req.body)
        .then(function (user) {
            res.json(user);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}
/**
 * Update user password when logged in
 *
 * @param req
 * @param res
 */
function updatePassword(req, res) {
    user.updatePassword(req.user, req.body)
        .then(function (user) {
            res.json(user);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}
/**
 * Creates a forgot password token and sends a mail with it
 *
 * @param req
 * @param res
 */
function forgotPassword(req, res) {
    user.generatePasswordResetToken(req.body.email)
        .then(sendPasswordResetLink)
        .catch(function (err) {
            res.status(500).send(err);
        });

    /**
     * Send the password reset email.
     *
     * @param passwordResetData
     * @returns {Promise.<T>}
     */
    function sendPasswordResetLink(passwordResetData) {
        return mail.send(passwordResetData)
            .then(function () {
                res.json();
            });
    }

}
/**
 * Updates password based on token
 *
 * @param req
 * @param res
 */
function resetPassword(req, res) {
    console.log(req.body);
    user.resetPassword(req.body)
        .then(function (user) {
            res.json(user);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}