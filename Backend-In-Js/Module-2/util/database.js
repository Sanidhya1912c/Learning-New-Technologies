const Sequelize = require("sequelize");

const sequelize = new Sequelize("myNodeDatabase", "root", "Shiva1821j@", {
  host: "localhost",
  dialect: 'mysql'
});


module.exports = sequelize;
