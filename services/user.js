module.exports = {
    loginWithEmail: loginWithEmail,
    loginWithToken: loginWithToken,
    signUp: signUp,
    update: update,
    updatePassword: updatePassword,
    generatePasswordResetToken: generatePasswordResetToken,
    resetPassword: resetPassword
};

//////////////////////////////

var mysql = require('mysql');
var md5 = require('md5');
var randomstring = require("randomstring");
var _ = require('lodash');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysqlsql',
    database: 'book-shop'
});

connection.connect();
/**
 * Searches for user email and password
 *
 * @param user
 */
function loginWithEmail(user) {
    return new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM users WHERE (email='" + user.email + "' AND password='" + md5(user.password) + "')", function (err, rows, result) {
            if (err) {
                reject(err);
            } else {
                resolve(rows[0]);
            }
        });
    });
}
/**
 * Search for user authentication token
 *
 * @param token
 * @param cb
 */
function loginWithToken(token, cb) {
    return new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM users WHERE authToken='" + token + "'", function (err, rows, result) {
            if (err) {
                reject(err);
            } else {
                resolve(rows[0]);
            }
        });
    });
}
/**
 * Creates a new user
 *
 * @param user
 */
function signUp(user) {
    user.password = md5(user.password);
    user.authToken = randomstring.generate();
    user.isAdmin = 0;
    return new Promise(function (resolve, reject) {
        connection.query('INSERT INTO users SET ?', user, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(_.assign({}, user, {id: result.insertId}));
            }
        });
    });
}
/**
 * Update user data
 *
 * @param userId
 * @param userData
 */
function update(userId, userData) {
    return new Promise(function (resolve, reject) {
        connection.query("UPDATE users SET ? WHERE ?", [userData, {id: userId}], function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(_.assign({}, userData, {id: userId}));
            }
        });
    });
}
/**
 * Update user password
 *
 * @param userData
 * @param newUserData
 */
function updatePassword(userData, newUserData) {
    return new Promise(function (resolve, reject) {
        if (userData.password == md5(newUserData.oldPassword)) {
            return connection.query("UPDATE users SET ? WHERE ?", [{password: md5(newUserData.password)}, {id: userData.id}], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(_.assign({}, userData, {id: userData.id}));
                }
            });
        } else return reject(500);

    });
}
/**
 *Insert at user details forgot password token
 *
 * @param email
 */
function generatePasswordResetToken(email) {
    var forgotPasswordToken = randomstring.generate();
    return new Promise(function (resolve, reject) {
        connection.query("UPDATE users SET ? WHERE ?", [{forgotPasswordToken: forgotPasswordToken}, {email: email}], function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve({
                    email: email,
                    forgotPasswordToken: forgotPasswordToken
                });
            }
        });
    });
}
/**
 * Resets password where forgot password token is found
 *
 * @param user
 */
function resetPassword(user) {
    return new Promise(function (resolve, reject) {
        connection.query("UPDATE users SET ? WHERE ?", [{password: md5(user.password)}, {forgotPasswordToken: user.code}], function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
}
