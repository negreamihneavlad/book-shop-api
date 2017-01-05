module.exports = {
    create: create,
    list: list,
    update: update,
    destroy: destroy
};

//////////////////////////////

var _ = require('lodash');
var orderItem = require('../services/order-items.js');
var book = require('../services/book.js');

orderItem.belongsTo(book);

/**
 * Add item
 *
 * @param req
 * @param res
 */
function create(req, res) {
    orderItem.create(req.body)
        .then(function (orderItem) {
            res.json(orderItem);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}
/**
 * Return all items
 *
 * @param req
 * @param res
 */
function list(req, res) {
    orderItem.findAll({
        where: {
            orderId: req.query.orderId
        },
        include: [
            {
                model: book
            }
        ]

    })
        .then(function (items) {
            res.json(items);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}
/**
 * Update item
 *
 * @param req
 * @param res
 */
function update(req, res) {
    orderItem.update(req.body, {
        where: {
            id: req.params.itemId
        }
    })
        .then(function () {
            orderItem.findOne({
                    where: {
                        id: req.params.itemId
                    }
                }
            ).then(function (itemSaved) {
                res.json(itemSaved);
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
 * Remove item
 *
 * @param req
 * @param res
 */
function destroy(req, res) {
    orderItem.destroy({where: {id: req.params.itemId}})
        .then(function () {
            res.json();
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}