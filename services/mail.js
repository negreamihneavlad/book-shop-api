var nodemailer = require('nodemailer');

module.exports = {
    emailChangePassword: emailChangePassword
}
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://bookshopwebsite@gmail.com:bookshop1@smtp.gmail.com');
/**
 * Send email to user with its token
 *
 * @param user
 */
function emailChangePassword(user) {
    var mailOptions;

    mailOptions = {
        from: '"Book Shop" <bookshopwebsite@gmail.com>',
        to: user.email,
        subject: 'Change password',
        text: 'Reset password: http://localhost:8080/#/account/reset-password?email='+user.email +'&code=' + user.forgotPasswordToken

    };

     return transporter.sendMail(mailOptions);
}

