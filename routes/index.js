const express = require("express");
const router = express.Router();

const { User, Meme } = require("../db/models");

const asyncHandler = (handler) => (req, res, next) => {
  return handler(req, res, next).catch(next);
};

const signoutUser = (req, res) => delete req.session.auth;

/* GET home page -- default sorted by likes. */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    // fetch memes by most comments
    // const trendingMemes = Meme.findAll();

    // fetch memes by likes
    // const bestMemes = Meme.findAll();

    res.render("index", { title: "Memehub" });
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

router.post("/sign-out", (req, res) => {
  signoutUser(req, res);
  res.redirect("/");
});

module.exports = router;
