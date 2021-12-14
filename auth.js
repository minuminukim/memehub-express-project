const db = require("./db/models");

const loginUser = (req, res, user) => {
  req.session.auth = {
    userId: user.id,
  };
};

const logoutUser = (req, res) => delete req.session.auth;

const restoreUser = async (req, res, next) => {
  console.log("req.session.auth", req.session.auth);
  if (req.session.auth) {
    const { userId } = req.session.auth;
    console.log("Hello from restoreUser");

    try {
      const user = await db.User.findByPk(userId);

      if (user) {
        res.locals.authenticated = true;
        res.locals.user = user;
        next();
      }
    } catch (err) {
      res.locals.authenticated = false;
      next(err);
    }
  }
  next();
};

module.exports = { loginUser, logoutUser, restoreUser };
