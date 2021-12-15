const {
  db: { username, password, database, host },
} = require("./index");

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: "postgres",
    seederStorage: "sequelize",
  },
  production: {
    use_env_variable: "DATEBASE_URL",
    dialect: "postgres",
    seederStorage: "sequelize",
  },
};
