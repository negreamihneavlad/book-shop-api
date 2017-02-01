var _ = require('lodash');
var shipping = require('../modules/shipping-detail.js');

module.exports = {
  create: create,
  list: list,
  update: update,
  destroy: destroy
};

//////////////////////////////

/**
 * Add shipping details
 *
 * @param shipData
 */
function create(shipData) {
  return shipping.create(shipData)
    .then(function (shipping) {
      return shipping;
    })
    .catch(function (err) {
      return err;
    });
}
/**
 * Return shipping details
 *
 */
function list() {
  return shipping.findAll()
    .then(function (items) {
      return items;
    })
    .catch(function (err) {
      return err;
    });
}
/**
 * Update shipping details
 *
 * @param shipData
 * @param shippingId
 */
function update(shipData, shippingId) {
  return shipping.update(shipData, {
    where: {
      id: shippingId
    }
  })
    .then(function () {
      return shipping.findOne({
          where: {
            id: shippingId
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
 * Remove shipping details
 *
 * @param shippingId
 */
function destroy(shippingId) {
  shipping.destroy({where: {id: shippingId}})
    .then(function () {
      return true;
    })
    .catch(function (err) {
      return err;
    });
}
