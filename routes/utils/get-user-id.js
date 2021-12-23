const getUserId = (req) =>
  req.session.auth === undefined ? null : parseInt(req.session.auth.userId, 10);

module.exports = getUserId;
