let { Sequelize, Model, DataTypes } = require("sequelize");
let sequelizeCon = new Sequelize("mysql://root:root@localhost:3308/crud");
// sequelizeCon.sync({ alter: true })
sequelizeCon.authenticate().then().catch();
module.exports = {
      Sequelize,
      Model,
      DataTypes,
      sequelizeCon
}