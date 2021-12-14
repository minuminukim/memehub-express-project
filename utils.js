const csrf = require("csurf");

const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

const isLoggedIn = (req) => req.session.auth === undefined;

module.exports = {
  csrfProtection,
  asyncHandler,
  isLoggedIn,
};
