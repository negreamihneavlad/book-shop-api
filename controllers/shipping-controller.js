module.exports = {
    create: create,
    list: list,
    update: update,
    destroy: destroy,
};

//////////////////////////////

var _ = require('lodash');
var shipping = require('../services/shipping-details.js');
/**
 * Add shipping details
 *
 * @param req
 * @param res
 */
function create(req, res) {
    shipping.create(req.body)
        .then(function (shipping) {
            res.json(shipping);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}
/**
 * Return shipping details
 *
 * @param req
 * @param res
 */
function list(req, res) {
    shipping.findAll()
        .then(function (items) {
            res.json(items);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}
/**
 * Update shipping details
 *
 * @param req
 * @param res
 */
function update(req, res) {
    shipping.update(req.body, {
        where: {
            id: req.params.shippingId
        }
    })
        .then(function () {
            shipping.findOne({
                    where: {
                        id: req.params.shippingId
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
 * Remove shipping details
 *
 * @param req
 * @param res
 */
function destroy(req, res) {
    shipping.destroy({where: {id: req.params.shippingId}})
        .then(function () {
            res.json();
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}
