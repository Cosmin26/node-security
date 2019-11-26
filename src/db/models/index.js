import { readdirSync } from "fs";
import { basename as _basename, join } from "path";
import Sequelize from "sequelize";
import configJson from "../config/config";

const basename = _basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = configJson[env];

console.log("this is the environment ", env);

const db = {};

let sequelize;
if (config.environment === "production") {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    dialectOption: {
      ssl: true,
      native: true
    },
    logging: true
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const fileNames = readdirSync(__dirname).filter(file => {
  return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
});

Promise.all(
  fileNames.map(async file => {
    const importedModel = await import(join(__dirname, file));
    const model = importedModel.default;
    db[model.name] = model.init(sequelize, Sequelize);
  })
).then(() => {
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
