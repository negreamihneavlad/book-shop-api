module.exports = {
    emailPasswordResetLink: emailPasswordResetLink
};

////////////////////////

/**
 * Create mail options to be sended
 *
 * @param passwordResetData
 * @returns {{from: string, to: *, subject: string, text: string}|*}
 */
function emailPasswordResetLink(passwordResetData) {
    var mailOptions;

    mailOptions = {
        from: '"Book Shop" <bookshopwebsite@gmail.com>',
        to: passwordResetData.email,
        subject: 'Change password',
        text: 'Reset password: http://localhost:8080/#/account/reset-password?email=' + passwordResetData.email + '&code=' + passwordResetData.forgotPasswordToken

    };
    return mailOptions;
}
