const express = require("express");
const { Meme, User } = require("../db/models");
const { asyncHandler } = require("../utils");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const router = express.Router();

router.get("/", (req, res) => {
  res.render("search-page", {
    title: "Search",
  });
});

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { search } = req.body;

    const findMeme = await Meme.findAll({
      where: {
        [Op.or]: {
          headline: {
            [Op.iLike]: `%${search}%`,
          },
          caption: {
            [Op.iLike]: `%${search}%`,
          },
        },
      },
      include: User,
    });

    console.log(findMeme >= 1);
    res.render("search-page", {
      title: "Search",
      findMeme,
      search,
    });
  })
);

module.exports = router;
