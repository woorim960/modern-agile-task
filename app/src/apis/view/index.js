"use strict";

const express = require("express");
const router = express.Router();

router.get("/todolist", (req, res) => {
  res.render("todolist");
});

router.get("/checkbox", (req, res) => {
  res.render("checkbox");
});

module.exports = router;
