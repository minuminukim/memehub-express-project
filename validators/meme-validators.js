const { check } = require("express-validator");

const memesValidators = [
  check("headline")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a Headline for your meme"),
  check("caption")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a Caption for your meme"),
  check("link")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a Link to your meme")
    .isURL()
    .withMessage("Please provide a valid URL for your link"),
];

module.exports = memesValidators;
