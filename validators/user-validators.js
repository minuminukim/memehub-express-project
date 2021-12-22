const { check } = require("express-validator");
const db = require("../db/models");

const userValidators = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please enter your Username.")
    .isLength({ max: 30 })
    .withMessage("Username must not be more than 30 characters long."),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please enter your First Name.")
    .isLength({ max: 50 })
    .withMessage("First Name must not be more than 50 characters long."),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please enter your Last Name.")
    .isLength({ max: 50 })
    .withMessage("Last Name must not be more than 50 characters long."),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please enter your Email.")
    .isLength({ max: 255 })
    .withMessage("Email Address must not be more than 255 characters long.")
    .isEmail()
    .withMessage("Email Address is not a valid email.")
    .custom((value) => {
      return db.User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided Email Address is already in use by another account."
          );
        }
      });
    }),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please enter your Password.")
    .isLength({ max: 50 })
    .withMessage("Password must not be more than 50 characters long.")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
    .withMessage(
      'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*").'
    ),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please confirm your Password.")
    .isLength({ max: 50 })
    .withMessage("Confirm Password must not be more than 50 characters long.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm Password does not match Password.");
      }
      return true;
    }),
];

module.exports = userValidators;
