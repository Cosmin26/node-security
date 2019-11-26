import dotenv from "dotenv";

dotenv.config();

/**
 * This config is needed for sequelize as currently sequelize doesn't get along with es6 that well
 */
module.exports = {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres"
  }
};
