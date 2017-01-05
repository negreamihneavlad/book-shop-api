var model = require('../services/model.js');
var order = require('../services/order.js');
var Sequelize = require('sequelize');

module.exports = model.define('shipping-details', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true
    },
    orderId: {
        type: Sequelize.INTEGER,
        filed: 'orderId',
        references: {
            model: order,

            key: 'id'
        }
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
    phone: {
        type: Sequelize.INTEGER,
        filed: 'phone'
    },
    address: {
        type: Sequelize.STRING,
        filed: 'address'
    },
    zipCode: {
        type: Sequelize.INTEGER,
        filed: 'zipCode'
    }
}, {
    freezeTableName: true
});



