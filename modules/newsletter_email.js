var model = require('../modules/model.js');
var Sequelize = require('sequelize');

module.exports = model.define('newsletter_email', {
  id: {
    type: Sequelize.INTEGER,
    field: 'id',
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    field: 'email'
  }
});