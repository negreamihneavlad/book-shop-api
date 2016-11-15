module.exports = {
    loginWithEmail: loginWithEmail,
    loginWithToken: loginWithToken,
    signUp: signUp
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
 *
 * @param token
 * @param cb
 */
function loginWithToken(token, cb) {

    return new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM users WHERE token='" + token + "'", function (err, rows, result) {
            if (err) {
                reject(err);
            } else {
                resolve(rows[0]);
            }
        });
    });
}
/**
 *
 * @param user
 */
function signUp(user) {
    user.password = md5(user.password);
    user.token = randomstring.generate();
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
