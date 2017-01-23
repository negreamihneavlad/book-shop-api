module.exports = {
    send: send
};

////////////////////////

var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var mailOptions = require('./mail-options.js');
var ejs = require('ejs'),
    fs = require('fs'),

    str = fs.readFileSync('layout/templates/order-email.ejs', 'utf8'); // TODO: Each require must have it's own var statement. Please fix this. Also require first, then export.
var auth = {
    auth: {
        api_key: process.env.MG_KEY,
        domain: process.env.MG_DOMAIN
    }
}; // TODO: Add empty line for better readability
var transporter = nodemailer.createTransport(mg(auth));

/**
 * Send email to user
 *
 * @param data
 */
function send(data) { // TODO: Your email service should not know about password and checkout emails. It should do one thing, send emails. You should create 2 different classes: PasswordResetEmail and CheckoutEmail that use mail.js and have their own send method.
    if (data.type == 'password') {
        var mailDetails = mailOptions.emailPasswordResetLink(data);
        return transporter.sendMail(mailDetails);
    }
    if (data.type == 'checkOut') {
        var messageHtml = ejs.render(str, {
            items: data.items,
            shippingDetails: data.shippingDetails
        });
        var sendPwdReset = transporter.templateSender({
            subject: 'Order confirmation',
            html: messageHtml
        }, {
            from: '"Book Shop" <bookshopwebsite@gmail.com>'
        });

        return sendPwdReset({
            to: data.shippingDetails.email
        });
    }
}
