module.exports = {
    loginWithEmail: loginWithEmail,
    loginWithToken: loginWithToken
};

//////////////////////////////

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysqlsql',
    database: 'book-shop'
});

connection.connect();

var md5 = require('md5');

function loginWithEmail(user) {

    return new Promise(function(resolve, reject) {
        connection.query("SELECT * FROM users WHERE (email='" + user.email + "' AND password='" + md5(user.password) + "')", function(err, rows, result) {
            if (err) {
                reject(err);
            } else {
                resolve(rows[0]);
            }
        });
    });
}

function loginWithToken(token, cb) {

    return new Promise(function(resolve, reject) {
        connection.query("SELECT * FROM users WHERE token='" + token + "'", function(err, rows, result) {
            if (err) {
                reject(err);
            } else {
                resolve(rows[0]);
            }
        });
    });
}
