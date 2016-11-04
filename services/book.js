module.exports = {
    create: create,
    update: update,
    destroy: destroy,
    list: list,
    listOne: listOne,
    search: search
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

function create(bookData) {

    return new Promise(function(resolve, reject) {
        connection.query('INSERT INTO books SET ?', bookData, function(err, result) {
        	debugger;
            if (err) {
                reject(err);
            } else {
                resolve({
                    id: result.insertId,
                    name: bookData.name,
                    author: bookData.author,
                    releaseDate: bookData.releaseDate,
                    description: bookData.description,
                    category: bookData.category,
                    picture: bookData.picture,
                    price: bookData.price
                });
            }
        });
    });
}

function update(bookId, bookData) {
    return new Promise(function(resolve, reject) {
        // console.log(bookId);
        connection.query("UPDATE books SET ? WHERE ?", [bookData, { id: bookId }], function(err, result) {
            if (err) {
                reject(err);
            } else {
                // console.log(result);
                resolve({
                    id: bookId,
                    name: bookData.name,
                    author: bookData.author,
                    releaseDate: bookData.releaseDate,
                    description: bookData.description,
                    category: bookData.category,
                    picture: bookData.picture,
                    price: bookData.price
                });
            }
        });
    });
}

function destroy(bookId) {

    return new Promise(function(resolve, reject) {
        connection.query('DELETE FROM books WHERE id= ?', bookId, function(err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result.affectedRows);
            }
        });
    });
}

function list() {
    return new Promise(function(resolve, reject) {
        connection.query('SELECT * FROM books', function(err, rows, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function listOne(bookId) {
    return new Promise(function(resolve, reject) {
        connection.query('SELECT * FROM books WHERE id= ?', bookId, function(err, rows, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(rows[0]);
            }
        });
    });
}

function search(keyword) {
    return new Promise(function(resolve, reject) {

        connection.query("SELECT * FROM books WHERE ( name LIKE '%"+ keyword +"%' OR author LIKE '%"+ keyword+"%')",function(err, rows, fields) {
        
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}
