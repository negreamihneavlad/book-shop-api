module.exports = {
    findOne: findOne,
    list: list,
    search: search,
    create: create,
    update: update,
    destroy: destroy

};

//////////////////////////////

var _ = require('lodash');
var book = require('../services/book.js');

/**
 * Search one book by id
 *
 * @param req
 * @param res
 */

function findOne(req, res) {
    book.findOne({
        where: {
            id: req.params.bookId
        }
    })
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
    book.findAll({
        where: {
            $and: [
                {author: {$like: '%' + _.get(req.query, 'author', '') + '%'}},
                {category: {$like: '%' + _.get(req.query, 'category', '') + '%'}},
                {publisher: {$like: '%' + _.get(req.query, 'publisher', '') + '%'}}
            ]
        }
    })
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
    book.findAll({
        where: {
            $or: [
                {name: {$like: '%' + req.query.toFind + '%'}},
                {author: {$like: '%' + req.query.toFind + '%'}},
                {category: {$like: '%' + req.query.toFind + '%'}},
                {publisher: {$like: '%' + req.query.toFind + '%'}}
            ],
            $and: [
                {author: {$like: '%' + _.get(req.query, 'author', '') + '%'}},
                {category: {$like: '%' + _.get(req.query, 'category', '') + '%'}},
                {publisher: {$like: '%' + _.get(req.query, 'publisher', '') + '%'}}
            ]
        }
    })
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
    book.update(req.body, {
        where: {
            id: req.params.bookId
        }
    })
        .then(function () {
            book.findOne({
                    where: {
                        id: req.params.bookId
                    }
                }
            ).then(function (bookSaved) {
                res.json(bookSaved);
            })
                .catch(function (err) {
                    res.status(500).send(err);
                });

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
    console.log(req.params.bookId);
    book.destroy({where: {id: req.params.bookId}})
        .then(function () {
            res.json();
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}
