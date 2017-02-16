var user = require('../services/user-service.js');

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

/**
 * Searches for user email and password
 *
 * @param req
 * @param res
 */
function login(req, res) {
  user.login(req.body)
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
  user.update(req.body, req.user.id)
    .then(function (userSaved) {
      res.json(userSaved);
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
  user.updatePassword(req.body, req.user.id)
    .then(function (userSaved) {
      res.json(userSaved);
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
  user.forgotPassword(req.body)
    .then(function () {
      res.json();
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}
/**
 * Updates password based on token
 *
 * @param req
 * @param res
 */
function resetPassword(req, res) {
  user.resetPassword(req.body)
    .then(function (userSaved) {
      res.json(userSaved);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}
/**
 * Checks if email is already registered
 *
 * @param req
 * @param res
 */
function existingEmail(req, res) {
  user.existingEmail(req.query.email)
    .then(function (emailExists) {
      res.json(emailExists)
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}