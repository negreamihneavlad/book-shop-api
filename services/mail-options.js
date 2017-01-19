module.exports = {
    emailPasswordResetLink: emailPasswordResetLink
};

////////////////////////

/**
 * Create mail options to be sended
 *
 * @param data
 * @returns {{from: string, to: *, subject: string, text: string}|*}
 */
function emailPasswordResetLink(data) {
    var mailOptions;

    mailOptions = {
        from: '"Book Shop" <bookshopwebsite@gmail.com>',
        to: data.email,
        subject: 'Change password',
        text: 'Reset password: '+process.env.HOST+'/#/account/reset-password?email=' + data.email + '&code=' + data.forgotPasswordToken
    };
    return mailOptions;
}

