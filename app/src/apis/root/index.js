"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./root.ctrl");

router.get("/todolist", ctrl.todolist.read);
router.post("/todolist", ctrl.todolist.create);
router.put("/todolist/:index", ctrl.todolist.update);
router.delete("/todolist/:index", ctrl.todolist.delete);

router.post("/selectbox/submit", ctrl.selectbox.isAnswer);
router.post("/submit", ctrl.checkbox.isAnswer);

router.get("/check", ctrl.login.check);
router.post("/login", ctrl.login.login);

module.exports = router;
