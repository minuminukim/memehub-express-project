const express = require("express");

const router = express.Router();

// mount subpaths

router.get("/", (req, res) => {
  res.json({ message: "Hello, world" });
});

module.exports = router;
