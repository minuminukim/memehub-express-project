const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const { sessionSecret } = require("./config");
const { restoreUser } = require("./auth");
const { sequelize } = require("./db/models");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const memesRouter = require("./routes/memes");
const searchRouter = require("./routes/search");
const apiRouter = require("./routes/api");

const app = express();

// view engine setup
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser(sessionSecret));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// set up session middleware
const store = new SequelizeStore({ db: sequelize });

app.use(
  session({
    name: "memehub.sid",
    secret: sessionSecret,
    store,
    saveUninitialized: false,
    resave: false,
  })
);

// create Session table if it doesn't already exist
store.sync();

app.use(restoreUser);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/memes", memesRouter);
app.use("/search", searchRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
