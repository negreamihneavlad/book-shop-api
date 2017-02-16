var user = require('../modules/user.js');
var mail = require('../services/mail.js');
var md5 = require('md5');
var randomstring = require("randomstring");
var fs = require('fs');
var template = fs.readFileSync('layout/templates/forgot-password-email.ejs', 'utf8');

module.exports = {
  login: login,
  signUp: signUp,
  update: update,
  updatePassword: updatePassword,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword,
  existingEmail: existingEmail
};

/**
 * Searches for user email and password
 *
 * @param credentials
 */
function login(credentials) {
  return user.findOne({
    where: {
      $and: [
        {email: credentials.email},
        {password: md5(credentials.password)}
      ]
    }
  })
    .then(function (user) {
      return user;
    })
    .catch(function (err) {
      return err;
    });
}
/**
 * Add a new user
 *
 * @param credentials
 */
function signUp(credentials) {
  credentials.password = md5(credentials.password);
  credentials.authToken = randomstring.generate();
  credentials.isAdmin = 0;
  return user.create(credentials)
    .then(function (user) {
      return user;
    })
    .catch(function (err) {
      return err;
    });
}
/**
 * Edit user details
 *
 * @param userData
 * @param userId
 */
function update(userData, userId) {
  return user.update(userData, {
    where: {
      id: userId
    }
  })
    .then(function () {
      return user.findOne({
          where: {
            id: userId
          }
        }
      )
    })
    .then(function (userSaved) {
      return userSaved;
    })
    .catch(function (err) {
      return err;
    });
}
/**
 * Update user password when logged in
 *
 * @param userData
 * @param userId
 */
function updatePassword(userData, userId) {
  return user.update({password: md5(userData.password)}, {
    where: {
      $and: [
        {id: userId},
        {password: md5(userData.oldPassword)}
      ]
    }
  })
    .then(function () {
      return user.findOne({
          where: {
            id: userId
          }
        }
      )
    })
    .then(function (userSaved) {
      return userSaved;
    })
    .catch(function (err) {
      return err;
    });
}
/**
 * Creates a forgot password token and sends a mail with it
 *
 * @param userData
 */
function forgotPassword(userData) {
  var forgotPasswordToken = randomstring.generate();
  var data={
    forgotPasswordToken: forgotPasswordToken,
    email: userData,
    host: process.env.HOST
  };
  var subject = 'Forgot Password';
  
  return user.update({forgotPasswordToken: forgotPasswordToken}, {
    where: {
      email: userData.email
    }
  })
    .then(sendPasswordResetLink())
    .catch(function (err) {
      return err;
    });
  
  /**
   * Send the password reset email.
   *
   * @returns {Promise.<T>}
   */
  function sendPasswordResetLink() {
    return mail.send(data, subject, userData.email, template)
      .then(function () {
        return true;
      });
  }
}
/**
 * Updates password based on token
 *
 * @param userData
 */
function resetPassword(userData) {
  return user.update({password: md5(userData.password)}, {
    where: {
      forgotPasswordToken: userData.code
    }
  })
    .then(function () {
      return user.findOne({
          where: {
            forgotPasswordToken: userData.code
          }
        }
      )
    })
    .then(function (userSaved) {
      return userSaved;
    })
    .catch(function (err) {
      return err;
    });
}
/**
 * Checks if email is already registered
 *
 * @param email
 */
function existingEmail(email) {
  return user.findAll({
    where: {
      email: email
    }
  })
    .then(function (user) {
      if (user.length == 1) {
        return {email_exists: true};
      }
      else {
        return {email_exists: false};
      }
    })
    .catch(function (err) {
      return err;
    });
}