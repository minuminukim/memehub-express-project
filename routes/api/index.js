const express = require("express");

const router = express.Router();
const commentRouter = require("./comments.js")

// mount subpaths
router.use("/comments", commentRouter);

router.get("/", (req, res) => {
  res.json({ message: "Hello, world" });
});

module.exports = router;
