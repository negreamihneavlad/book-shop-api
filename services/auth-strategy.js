var user = require('./../modules/user.js');

var Strategy = require('passport-http-bearer').Strategy;

module.exports = new Strategy(
  function (token, cb) {
    user.findOne({
      where: {
        authToken: token
      }
    })
      .then(function (user) {
        if (user) {
          cb(null, user);
        } else cb(null, false);
      })
      .catch(function (err) {
        cb(err);
      });
  });
