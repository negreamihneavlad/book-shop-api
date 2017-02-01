var model = require('../services/model.js');
var Sequelize = require('sequelize');

module.exports = model.define('users', {
  id: {
    type: Sequelize.INTEGER,
    field: 'id',
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING,
    field: 'firstName'
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'lastName'
  },
  email: {
    type: Sequelize.STRING,
    field: 'email'
  },
  password: {
    type: Sequelize.STRING,
    filed: 'password'
  },
  authToken: {
    type: Sequelize.STRING,
    filed: 'authToken'
  },
  forgotPasswordToken: {
    type: Sequelize.STRING,
    filed: 'forgotPasswordToken'
  },
  isAdmin: {
    type: Sequelize.INTEGER,
    field: 'isAdmin'
  }
}, {
  freezeTableName: true
});
