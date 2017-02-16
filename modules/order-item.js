var model = require('./model.js');
var order = require('./order.js');
var book = require('./book.js');
var Sequelize = require('sequelize');

module.exports = model.define('order_items', {
  id: {
    type: Sequelize.INTEGER,
    field: 'id',
    primaryKey: true
  },
  orderId: {
    type: Sequelize.INTEGER,
    field: 'orderId',
    references: {
      model: order,
      
      key: 'id'
    }
  },
  bookId: {
    type: Sequelize.INTEGER,
    field: 'bookId',
    references: {
      model: book,
      
      key: 'id'
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    field: 'quantity'
  }
}, {
  freezeTableName: true
});
