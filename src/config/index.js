import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  env: process.env.NODE_ENV,
  database: process.env.DB_NAME,
  dbUsername: process.env.DB_USER,
  dbPassword: process.env.DB_PASS,
  /**
   * DB IP or if it's hosted on an dns put that one in the dotenv file. If it's docker or VM check that container's ip and put it here
   */
  dbHost: process.env.DB_HOST,
  /**
   * Port on which the db server runs. Usually your db provider has a default port.
   */
  dbPort: process.env.DB_PORT,
  dbDialect: process.env.DB_DIALECT,
  /**
   * Server Port
   */
  port: parseInt(process.env.PORT, 10),

  databaseURL: process.env.MONGODB_URI,

  jwtSecret: process.env.JWT_SECRET,

  refreshSecret: process.env.REFRESH_SECRET,

  jwtTokenExpiresIn: process.env.JWT_EXPIRES_IN,

  refreshTokenExpiresIn: process.env.REFRESH_EXPIRES_IN,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || "silly"
  },

  /**
   * API configs
   */
  api: {
    prefix: "/api"
  }
};
