module.exports = {
    findOne: findOne,
    list: list,
    search: search,
    create: create,
    update: update,
    destroy: destroy

};

var book = require('../services/book.js');

/**
 * Search one book by id
 *
 * @param req
 * @param res
 */
function findOne(req, res) {
    book.findOne(req.params.bookId)
        .then(function (book) {
            res.json(book);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}
/**
 * Get all books
 *
 * @param req
 * @param res
 */
function list(req, res) {
    book.list(req.query)
        .then(function (books) {
            res.json(books);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}
/**
 * Search books by name or author and filters
 *
 * @param req
 * @param res
 */
function search(req, res) {
    book.search(req.query)
        .then(function (books) {
            res.json(books);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}
/**
 * Create book
 *
 * @param req
 * @param res
 */
function create(req, res) {
    book.create(req.body)
        .then(function (book) {
            console.log(book);
            res.json(book);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}
/**
 * Update book details
 *
 * @param req
 * @param res
 */
function update(req, res) {
    book.update(req.params.bookId, req.body)
        .then(function (book) {
            res.json(book);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}
/**
 * Remove book
 *
 * @param req
 * @param res
 */
function destroy(req, res) {
    book.destroy(req.params.bookId)
        .then(function () {
            res.json();
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}
