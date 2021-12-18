const express = require("express");

const router = express.Router();
const commentRouter = require("./comments.js");
const followsRouter = require("./follows.js");

// mount subpaths
router.use("/comments", commentRouter);
router.use("/follows", followsRouter);

router.get("/", (req, res) => {
  res.json({ message: "Hello, world" });
});

module.exports = router;
