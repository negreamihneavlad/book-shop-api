var _ = require('lodash');
var orderItem = require('../modules/order-item.js');
var book = require('../modules/book.js');

module.exports = {
  create: create,
  list: list,
  update: update,
  destroy: destroy
};

//////////////////////////////

orderItem.belongsTo(book);

/**
 * Create item on order
 *
 * @param order
 * @returns {*}
 */
function create(order) {
  return orderItem.create(order)
    .then(function (orderItem) {
      return orderItem;
    })
    .catch(function (err) {
      return err;
    });
}

/**
 * Get all items from order
 *
 * @param orderId
 * @returns {*}
 */
function list(orderId) {
  return orderItem.findAll({
    where: {
      orderId: orderId
    },
    include: [
      {
        model: book
      }
    ]
    
  })
    .then(function (items) {
      return items;
    })
    .catch(function (err) {
      return err;
    });
}

/**
 * Update items on order
 *
 * @param order
 * @param itemId
 * @returns {*}
 */
function update(order, itemId) {
  return orderItem.update(order, {
    where: {
      id: itemId
    }
  })
    .then(function () {
      return orderItem.findOne({
          where: {
            id: itemId
          }
        }
      )
    })
    .then(function (itemSaved) {
      return itemSaved;
    })
    
    .catch(function (err) {
      return err;
    });
}

/**
 * Remove an item from order
 *
 * @param itemId
 * @returns {*}
 */
function destroy(itemId) {
  return orderItem.destroy({where: {id: itemId}})
    .then(function () {
      return true;
    })
    .catch(function (err) {
      return err;
    });
}
