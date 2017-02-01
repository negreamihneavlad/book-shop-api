var Sequelize = require('sequelize');

module.exports = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.SQL_DIALECT,
  
  pool: {
    max: process.env.SQL_POOL_MAX,
    min: process.env.SQL_POOL_MIN,
    idle: process.env.SQL_POOL_IDLE
  },
  define: {
    timestamps: false
  }
});
