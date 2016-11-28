module.exports = {
    send: send
};

////////////////////////

var nodemailer = require('nodemailer');
var password = require('../services/password.js');

var transporter = nodemailer.createTransport('smtps://bookshopwebsite@gmail.com:bookshop1@smtp.gmail.com');
/**
 * Send email to user with its token
 *
 * @param passwordResetData
 */
function send(passwordResetData){
    return transporter.sendMail(password.emailPasswordResetLink(passwordResetData));
}

