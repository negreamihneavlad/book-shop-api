module.exports = {
    create: create,
    update: update,
    destroy: destroy,
    list: list,
    findOne: findOne,
    search: search
};

//////////////////////////////

var mysql = require('mysql');
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
 * @param bookData
 */
function create(bookData) {

    return new Promise(function (resolve, reject) {
        connection.query('INSERT INTO books SET ?', bookData, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(_.assign({}, bookData, {id: result.insertId}));
            }
        });
    });
}


/**
 *
 * @param bookId
 * @param bookData
 */
function update(bookId, bookData) {
    return new Promise(function (resolve, reject) {
        connection.query("UPDATE books SET ? WHERE ?", [bookData, {id: bookId}], function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(_.assign({}, bookData, {id: bookId}));
            }
        });
    });
}
/**
 *
 * @param bookId
 */
function destroy(bookId) {

    return new Promise(function (resolve, reject) {
        connection.query('DELETE FROM books WHERE id= ?', bookId, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function list() {
    return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM books', function (err, rows, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}
/**
 *
 * @param bookId
 */
function findOne(bookId) {
    return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM books WHERE id= ?', bookId, function (err, rows, fields) {
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
 * @param keyword
 */
function search(keyword) {
    return new Promise(function (resolve, reject) {

        connection.query("SELECT * FROM books WHERE ( name LIKE '%" + keyword + "%' OR author LIKE '%" + keyword + "%')", function (err, rows, fields) {

            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}
