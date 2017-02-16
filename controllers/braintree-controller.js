var Braintree = require("../services/braintree.js");

module.exports = {
  clientToken: clientToken,
  payment: payment
};

////////////////////////

/**
 * Create client token
 *
 * @param req
 * @param res
 */
function clientToken(req, res) {
  Braintree.generateToken()
    .then(function (response) {
      res.send(response);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}
/**
 * Make payment
 *
 * @param req
 * @param res
 */
function payment(req, res) {
  var nonceFromTheClient = req.body.payment_method_nonce;
  var totalPrice = req.body.totalPrice;
  Braintree.payment(totalPrice, nonceFromTheClient)
    .then(function (response) {
      res.status(200).send(response);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}
