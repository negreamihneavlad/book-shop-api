var fs = require('fs');
var template = fs.readFileSync('layout/templates/order-email.ejs', 'utf8');

module.exports = {
  checkOut: checkOut
};

//////////////////////////////

var mail = require('../services/mail.js');

/**
 * Send invoice email
 *
 * @param req
 * @param res
 */
function checkOut(req, res) {
  var subject = 'Order confirmation';
  return mail.send(req.body, subject, req.body.shippingDetails.email, template)
    .then(function () {
      res.json();
    });
}