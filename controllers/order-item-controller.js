var orderItem = require('../services/order-item-service.js');

module.exports = {
  create: create,
  list: list,
  update: update,
  destroy: destroy
};

//////////////////////////////

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
  orderItem.list(req.query.orderId)
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
  orderItem.update(req.body, req, params.itemId)
    .then(function (itemSaved) {
      res.json(itemSaved);
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
  orderItem.destroy(req.params.itemId)
    .then(function () {
      res.json();
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}
