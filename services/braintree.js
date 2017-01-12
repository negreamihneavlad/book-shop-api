module.exports = {
    generateToken: generateToken,
    payment: payment
};

////////////////////////

var braintree = require("braintree");

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BT_MERCHANT_ID,
    publicKey: process.env.BT_PUBLIC_KEY,
    privateKey: process.env.BT_PRIVATE_KEY
});

/**
 * Generate client token
 *
 */
function generateToken() {
    return new Promise(function (resolve, reject) {
        gateway.clientToken.generate({},
            function (err, response) {
                resolve(response.clientToken);
            });

    })
}
/**
 * Payment
 *
 * @param totalPrice
 * @param nonceFromTheClient
 */
function payment(totalPrice, nonceFromTheClient) {
    return new Promise(function (resolve, reject) {
        gateway.transaction.sale({
            amount: totalPrice,
            paymentMethodNonce: nonceFromTheClient,
            options: {
                submitForSettlement: true
            }
        }, function (err, result) {
            resolve(result);
            reject(err);
        });
    })

}