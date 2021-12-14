const express = require("express");
const router = express.Router();

const { User, Meme, Comment, Like, Follow } = require("../db/models");
const { logoutUser } = require("../auth");
const { asyncHandler } = require("../utils");

const memesByComments = (a, b) => {
  if (a.Comments.length < b.Comments.length) {
    return 1;
  } else if (b.Comments.length > a.Comments.length) {
    return -1;
  }
  return 0;
};
/* GET home page -- default sorted by likes. */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const memes = await Meme.findAll({ include: [Comment, Like, User] });

    // fetch memes by most comments
    const trendingMemes = memes
      .filter((meme) => meme.Comments.length)
      .sort((a, b) => memesByComments(a, b))
      .slice(0, 6);
    // console.log("hello", JSON.stringify(trendingMemes, null, 2));
    // fetch memes by likes
    // const bestMemes = Meme.findAll();
    if (req.session.auth === undefined) {
      res.render("landing-page", { title: "Memehub", trendingMemes, i: 1 });
    } else {
      res.render("index", { title: "Memehub" });
    }
  })
);

// GET home page sorted by recent
router.get("/recent", (req, res, next) => {
  res.render("index", { title: "Memehub" });
});

// GET home page sorted by most comments
router.get("/hot", (req, res, next) => {
  res.render("index", { title: "Memehub" });
});

// GET following feed
router.get("/you", (req, res, next) => {
  res.render("index", { title: "Memehub" });
});

module.exports = router;
