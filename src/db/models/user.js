import Sequelize from "sequelize";

export default class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1, 255]
          }
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: {
            isEmail: true,
            len: [6, 320]
          }
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [6, 256]
          }
        },
        refreshToken: {
          type: DataTypes.STRING
        }
      },
      { sequelize }
    );
  }
}
