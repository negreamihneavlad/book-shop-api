var _ = require('lodash');
var order = require('../modules/order.js');

module.exports = {
  create: create,
  getById: getById,
  destroy: destroy
};

//////////////////////////////

/**
 * Create order
 *
 * @param userId
 */
function create(userId) {
  return order.create({
    userId: userId,
    status: 0
  })
    .then(function (order) {
      return order;
    })
    .catch(function (err) {
      return err;
    });
}
/**
 * Check if order exists
 *
 * @param userId
 */
function getById(userId) {
  return order.findOne({
    where: {
      userId: userId
    }
  })
    .then(function (order) {
      return order;
    })
    .catch(function (err) {
      return err;
    });
}
/**
 * Delete order
 *
 * @param orderId
 */
function destroy(orderId) {
  return order.destroy({
    where: {
      id: orderId
    }
  })
    .then(function () {
      return true;
    })
    .catch(function (err) {
      return err;
    });
}