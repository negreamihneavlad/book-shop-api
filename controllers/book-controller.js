module.exports = {
    findOne: findOne,
    list: list,
    categories: categories,
    publishers: publishers,
    length: length,
    authors: authors,
    search: search,
    create: create,
    update: update,
    destroy: destroy
};

//////////////////////////////

var _ = require('lodash'); // TODO: Require first, then export
var book = require('../services/book.js');
var Sequelize = require('sequelize');

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
        offset: (req.query.page - 1) * 10,
        limit: 10,
        where: { // TODO: This logic shouldn't be in the controller. The controller should not know that the model is defined by Sequelize. it should use the Book model like a black box, passing some simple parameters and getting back the results.
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
 * Get categories
 *
 * @param req
 * @param res
 */
function categories(req, res) {
    book.findAll({
        attributes: [Sequelize.literal('DISTINCT `category`'), 'category']
    })
        .then(function (categories) {
            res.json(categories);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}
/**
 * Get publishers
 *
 * @param req
 * @param res
 */
function publishers(req, res) {
    book.findAll({
        attributes: [Sequelize.literal('DISTINCT `publisher`'), 'publisher']
    })
        .then(function (publishers) {
            res.json(publishers);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}
/**
 * Get authors
 *
 * @param req
 * @param res
 */
function authors(req, res) {
    book.findAll({
        attributes: [Sequelize.literal('DISTINCT `author`'), 'author']
    })
        .then(function (authors) {
            res.json(authors);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}
/**
 * Get length
 *
 * @param req
 * @param res
 */
function length(req, res) {
    book.count({
        where: {
            $or: [
                {name: {$like: '%' + _.get(req.query, 'toFind', '') + '%'}},
                {author: {$like: '%' + _.get(req.query, 'toFind', '') + '%'}},
                {category: {$like: '%' + _.get(req.query, 'toFind', '') + '%'}},
                {publisher: {$like: '%' + _.get(req.query, 'toFind', '') + '%'}}
            ],
            $and: [
                {author: {$like: '%' + _.get(req.query, 'author', '') + '%'}},
                {category: {$like: '%' + _.get(req.query, 'category', '') + '%'}},
                {publisher: {$like: '%' + _.get(req.query, 'publisher', '') + '%'}}
            ]
        }
    })
        .then(function (length) {
            res.json(length);
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
        offset: (req.query.page - 1) * 10,
        limit: 10,
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
        .then(function () { // TODO: You can simplify this function. Let's discuss this one.
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
    book.destroy({where: {id: req.params.bookId}})
        .then(function () {
            res.json();
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}
