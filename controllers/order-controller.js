module.exports = {
    create: create,
    checkOrder: checkOrder,
    destroy: destroy
};

//////////////////////////////

var _ = require('lodash');
var order = require('../services/order.js');
/**
 * Create order
 *
 * @param req
 * @param res
 */
function create(req, res) {
    order.create({
        userId: req.user.id,
        status: 0
    })
        .then(function (order) {
            res.json(order);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}
/**
 * Check if order exists
 *
 * @param req
 * @param res
 */
function checkOrder(req, res) {
    order.findOne({
        where: {
            userId: req.user.id
        }
    })
        .then(function (order) {
            res.json(order);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}
/**
 * Delete order
 *
 * @param req
 * @param res
 */
function destroy(req, res) {
    order.destroy({where: {id: req.query.orderId}})
        .then(function () {
            res.json();
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}