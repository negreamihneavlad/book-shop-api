var Sequelize = require('sequelize');

module.exports = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql', // TODO: Remove unnecessary empty line

    pool: {
        max: 5,
        min: 0,
        idle: 10000 // TODO: You shouldn't harcode these values. Read them from the .env file instead.
    },
    define: {
        timestamps: false
    }
});

