var Sequelize = require('sequelize');


module.exports = new Sequelize('book-shop', 'root', 'mysqlsql', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        timestamps: false
    }
});

