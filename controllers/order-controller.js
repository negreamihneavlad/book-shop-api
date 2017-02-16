var order = require('../services/order-service.js');

module.exports = {
  create: create,
  checkOrder: checkOrder,
  destroy: destroy
};

//////////////////////////////

/**
 * Create order
 *
 * @param req
 * @param res
 */
function create(req, res) {
  order.create(req.user.id)
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
  order.getById(req.user.id)
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
  order.destroy(req.query.orderId)
    .then(function () {
      res.json();
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}
