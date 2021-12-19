const express = require("express");
const { validationResult } = require("express-validator");

const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("../utils");

const router = express.Router();

router.get('/', (req, res) =>{
    res.render('search-page', {
        title: "Search"
    })
});

module.exports = router;
