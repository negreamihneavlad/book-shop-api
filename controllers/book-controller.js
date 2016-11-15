var book = require('../services/book.js');
var _ = require('lodash');

module.exports = {
    findOne: findOne,
    list: list,
    search: search,
    create: create,
    update: update,
    destroy: destroy

}
/**
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
 *
 * @param req
 * @param res
 */
function list(req, res) {
    book.list()
        .then(function (books) {
            res.json(books);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}
/**
 *
 * @param req
 * @param res
 */
function search(req, res) {
    book.search(req.params.term)
        .then(function (books) {
            res.json(books);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}
/**
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
