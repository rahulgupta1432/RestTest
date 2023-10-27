let { sequelizeCon, Model, DataTypes, Sequelize } = require("../init/dbConfig");
class User extends Model { };
User.init({
      id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
      },
      username: {
            type: DataTypes.STRING(255),
            allowNull: false
      },
      image: {
            type: DataTypes.STRING(255),
            allowNull: true
      },
      summary: {
            type: DataTypes.STRING(500),
            allowNull: false
      }
}, {
      tableName: "user", modelName: "User", sequelize: sequelizeCon
})
module.exports = { User };