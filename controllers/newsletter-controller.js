var newsletter = require('../modules/newsletter_email.js');

module.exports = {
  create: create
};

//////////////////////////////

function create(req, res) {
  return newsletter.create(req.body)
    .then(function (email) {
      res.json(email);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}