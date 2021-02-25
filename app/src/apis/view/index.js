"use strict";

const express = require("express");
const router = express.Router();

router.get("/todolist", (req, res) => {
  res.render("main");
});

module.exports = router;
