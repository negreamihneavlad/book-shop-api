var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var ejs = require('ejs');


module.exports = {
  send: send
};

////////////////////////

var auth = {
  auth: {
    api_key: process.env.MG_KEY,
    domain: process.env.MG_DOMAIN
  }
};

var transporter = nodemailer.createTransport(mg(auth));

/**
 * Send email to user
 *
 * @param data
 * @param subject
 * @param email
 * @param template
 */
function send(data, subject, email, template) {
    var messageHtml = ejs.render(template, {
      data: data
    });
    var sendPwdReset = transporter.templateSender({
      subject: subject,
      html: messageHtml
    }, {
      from: '"Book Shop" <bookshopwebsite@gmail.com>'
    });
    
    return sendPwdReset({
      to: email
    });
}
