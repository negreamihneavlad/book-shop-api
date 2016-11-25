module.exports = {
    create: create,
    update: update,
    destroy: destroy,
    list: list,
    findOne: findOne,
    search: search,
    searchFilters: searchFilters
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
 */
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
 * @param keyword
 */
function search(toFind,keyword) {
    if (keyword.author === 'undefined'){
        keyword.author='';
    }
    if (keyword.publisher === 'undefined'){
        keyword.publisher='';
    }
    if (keyword.category === 'undefined'){
        keyword.category='';
    }
    return new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM books WHERE ( (name LIKE '%" + toFind + "%' OR author LIKE '%" + toFind + "%' OR category LIKE '%" + toFind + "%' OR publisher LIKE '%" + toFind + "%') AND (author LIKE '%" + keyword.author + "%' AND category LIKE '%" + keyword.category + "%' AND publisher LIKE '%" + keyword.publisher + "%'))", function (err, rows, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function searchFilters(keyword) {
    if (keyword.author === 'undefined'){
        keyword.author='';
    }
    if (keyword.publisher === 'undefined'){
        keyword.publisher='';
    }
    if (keyword.category === 'undefined'){
        keyword.category='';
    }
    return new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM books WHERE (author LIKE '%" + keyword.author + "%' AND category LIKE '%" + keyword.category + "%' AND publisher LIKE '%" + keyword.publisher + "%')", function (err, rows, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}
