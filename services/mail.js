module.exports = {
    send: send
};

////////////////////////

var nodemailer = require('nodemailer');
var mailOptions = require('./mail-options.js');
var ejs = require('ejs'),
    fs = require('fs'),
    str = fs.readFileSync('layout/templates/order-email.ejs', 'utf8');

var transporter = nodemailer.createTransport('smtps://bookshopwebsite@gmail.com:bookshop1@smtp.gmail.com');
/**
 * Send email to user
 *
 * @param data
 */
function send(data) {
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
