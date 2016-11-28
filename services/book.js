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
 * Insert new book
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
 * Update book data
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
 * Removes a book
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
/**
 * Returns all books
 *
 * @param keywords
 */
function list(keywords) {
    return new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM books WHERE (author LIKE ? AND category LIKE ? AND publisher LIKE ?)", [
            "%" + _.get(keywords, "author", "") + "%",
            "%" + _.get(keywords, "category", "") + "%",
            "%" + _.get(keywords, "publisher", "") + "%"
        ], function (err, rows, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}
/**
 * Returns searched book after id
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
 * Returns searched book after name or author
 *
 * @param keywords
 */
function search(keywords) {
    return new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM books WHERE ( (name LIKE '%" + keywords.toFind + "%' OR author LIKE '%" + keywords.toFind + "%' OR category LIKE '%" + keywords.toFind + "%' OR publisher LIKE '%" + keywords.toFind + "%') AND (author LIKE ? AND category LIKE ? AND publisher LIKE ? ))",[
            "%" + _.get(keywords, "author", "") + "%",
            "%" + _.get(keywords, "category", "") + "%",
            "%" + _.get(keywords, "publisher", "") + "%"
        ], function (err, rows, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

