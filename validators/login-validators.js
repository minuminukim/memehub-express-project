const { check } = require("express-validator");

const loginValidators = [
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please enter your Email."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please enter your Password."),
];

module.exports = loginValidators;
