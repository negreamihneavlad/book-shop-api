module.exports = {
    checkOut: checkOut
};

//////////////////////////////

var mail = require('../services/mail.js');

function checkOut(req, res) {
    var checkOutData = {
        type: 'checkOut',
        shippingDetails: req.body.shippingDetails,
        items: req.body.items
    };

    return mail.send(checkOutData)
        .then(function () {
            res.json();
        });
}