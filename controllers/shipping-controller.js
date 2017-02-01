var shipping = require('../services/shipping-service.js');

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
 * @param res
 */
function list(res) {
  shipping.list()
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
  shipping.update(req.body,req.params.shippingId)
    .then(function(shippingData){
      res.json(shippingData);
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
  shipping.destroy(req.params.shippingId)
    .then(function () {
      res.json();
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}
