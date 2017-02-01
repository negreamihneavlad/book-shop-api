var model = require('../services/model.js');
var Sequelize = require('sequelize');

module.exports = model.define('books', {
  id: {
    type: Sequelize.INTEGER,
    field: 'id',
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    field: 'name'
  },
  author: {
    type: Sequelize.STRING,
    field: 'author'
  },
  category: {
    type: Sequelize.STRING,
    field: 'category'
  },
  releaseDate: {
    type: Sequelize.DATE,
    field: 'releaseDate'
  },
  description: {
    type: Sequelize.STRING,
    filed: 'description'
  },
  picture: {
    type: Sequelize.STRING,
    filed: 'picture'
  },
  price: {
    type: Sequelize.FLOAT,
    filed: 'price'
  },
  publisher: {
    type: Sequelize.STRING,
    field: 'publisher'
  },
  isbn: {
    type: Sequelize.STRING,
    field: 'isbn'
  },
  pages: {
    type: Sequelize.INTEGER,
    field: 'pages'
  },
  quantity: {
    type: Sequelize.INTEGER,
    field: 'quantity'
  }
}, {
  freezeTableName: true
});

