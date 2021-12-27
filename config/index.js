module.exports = {
  environment: process.env.NODE_ENV || "development",
  port: process.env.PORT || 8080,
  sessionSecret: process.env.SESSION_SECRET,
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
  },
  passwords: {
    david: process.env.DAVID_PASSWORD,
    will: process.env.WILL_PASSWORD,
    anthony: process.env.ANTHONY_PASSWORD,
    minu: process.env.MINU_PASSWORD,
  }
};
