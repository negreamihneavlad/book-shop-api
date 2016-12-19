module.exports = {
    login: login,
    signUp: signUp,
    update: update,
    updatePassword: updatePassword,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
    existingEmail: existingEmail
};

//////////////////////////////

var user = require('../services/user.js');
var mail = require('../services/mail.js');
var md5 = require('md5');
var randomstring = require("randomstring");

/**
 * Searches for user email and password
 *
 * @param req
 * @param res
 */
function login(req, res) {
    user.findOne({
        where: {
            $and: [
                {email: req.body.email},
                {password: md5(req.body.password)}
            ]
        }
    })
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
    req.body.password = md5(req.body.password);
    req.body.authToken = randomstring.generate();
    req.body.isAdmin = 0;
    user.create(req.body)
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
    user.update(req.body, {
        where: {
            id: req.user.id
        }
    })
        .then(function () {
            user.findOne({
                    where: {
                        id: req.user.id
                    }
                }
            ).then(function (userSaved) {
                res.json(userSaved);
            })
                .catch(function (err) {
                    res.status(500).send(err);
                });
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
    console.log(req.body);
    user.update({password: md5(req.body.password)}, {
        where: {
            $and: [
                {id: req.user.id},
                {password: md5(req.body.oldPassword)}
            ]
        }
    })
        .then(function () {
            user.findOne({
                    where: {
                        id: req.user.id
                    }
                }
            ).then(function (userSaved) {
                res.json(userSaved);
            })
                .catch(function (err) {
                    res.status(500).send(err);
                });
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
    var forgotPasswordToken = randomstring.generate();
    var passwordResetData = {
        email: req.body.email,
        forgotPasswordToken: forgotPasswordToken
    };
    console.log(passwordResetData);
    user.update({forgotPasswordToken: forgotPasswordToken}, {
        where: {
            email: req.body.email
        }
    })
        .then(sendPasswordResetLink(passwordResetData))
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
    console.log(req.body.code);
    user.update({password: md5(req.body.password)}, {
        where: {
            forgotPasswordToken: req.body.code
        }
    })
        .then(function () {
            user.findOne({
                    where: {
                        forgotPasswordToken: req.body.code
                    }
                }
            ).then(function (userSaved) {
                res.json(userSaved);
            })
                .catch(function (err) {
                    res.status(500).send(err);
                });
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}

function existingEmail(req,res) {
    console.log(req.query.email);
    user.findAll({
        where: {
            email: req.query.email
        }
    })
        .then(function (user) {
            if (user.length == 1){
                res.send({email_exists: true});
            }
            else {
                res.send({email_exists: false});
            }
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}