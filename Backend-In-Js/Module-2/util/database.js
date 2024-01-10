const Sequelize = require("sequelize");

const sequelize = new Sequelize("mydatabase", "sk20", "Shiva1821j@", {
  host: "localhost",
  dialect: 'mysql'
});

module.exports = sequelize;
