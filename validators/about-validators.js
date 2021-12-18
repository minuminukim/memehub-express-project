const { check } = require("express-validator");
const db = require("../db/models");

const aboutValidators =[
    check('biography')
    .isLength({ max: 160 })
    .withMessage("Biography must not be more than 160 characters long"),
    check('profilePicture')
    .isURL()
    .withMessage('Please provide a valid URL for your link')
]

module.exports = aboutValidators;
