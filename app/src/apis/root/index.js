"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./root.ctrl");

router.post("/todolist", ctrl.todolist.read);
router.put("/todolist", ctrl.todolist.create);
router.delete("/todolist/:index", ctrl.todolist.delete);

module.exports = router;
