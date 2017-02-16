var model = require('../modules/model.js');
var user = require('./user.js');
var Sequelize = require('sequelize');

module.exports = model.define('orders', {
  id: {
    type: Sequelize.INTEGER,
    field: 'id',
    primaryKey: true
  },
  userId: {
    type: Sequelize.INTEGER,
    field: 'userId',
    references: {
      model: user,
      
      key: 'id'
    }
  },
  status: {
    type: Sequelize.INTEGER,
    filed: 'status'
  }
}, {
  freezeTableName: true
});
