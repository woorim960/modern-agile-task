"use strict";

const express = require("express");
const router = express.Router();

router.get("/todolist", (req, res) => {
  res.render("todolist");
});

router.get("/checkbox", (req, res) => {
  res.render("checkbox");
});

router.get("/selectbox", (req, res) => {
  res.render("selectbox");
});

module.exports = router;
