module.exports = {
    generateToken: generateToken,
    payment: payment
};

////////////////////////

var braintree = require("braintree"); // TODO: require first, then export as in the other files. While this works, please use the same pattern

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
} // TODO: Add empty line
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
            reject(err); // TODO: You resolve the promise, then immediately reject it. What's the reason?
        });
    })

}
// TODO: Use two spaces instead of tabs. Setup in Webstorm preferences.