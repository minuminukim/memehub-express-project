const express = require("express");
const Sequelize = require("sequelize");
const { Meme, User } = require("../db/models");
const { asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");
const Op = Sequelize.Op;

const router = express.Router();

router.get("/", requireAuth, (req, res) => {
  res.render("search-page", {
    title: "Search",
  });
});

router.post(
  "/",
  requireAuth,
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

    res.render("search-page", {
      title: "Search",
      findMeme,
      search,
    });
  })
);

module.exports = router;
