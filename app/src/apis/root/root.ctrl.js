"use strict";

const mysql = require("mysql");
let db = require("../../config/db");
const crypto = require("crypto");

const todolist = {
  read: (req, res) => {
    const query = "SELECT * FROM todos;";

    db.query(query, (err, posts) => {
      if (err) throw err;
      return res.json(posts);
    });
  },

  create: (req, res) => {
    const client = req.body;
    const index = crypto.randomBytes(20).toString("hex").slice(0, 20); // token 생성

    const query = "INSERT INTO todos(id, name, description) VALUES (?, ?, ?);";

    db.query(query, [index, client.name, client.description], (err, result) => {
      if (err) throw err;
      return res.status(201).send(index).end();
    });
  },

  delete: (req, res) => {
    const index = req.params.index;

    const query = "DELETE FROM todos WHERE id=?;";

    db.query(query, [index], (err, result) => {
      if (err) throw err;
      console.log(result);
      if (result.affectedRows) {
        return res.status(201).send(index).end();
      }
      return res.status(200).send("삭제되지 않았습니다.");
    });
  },
};

const checkbox = {
  isAnswer: (req, res) => {
    const client = req.body;
    if (!client.answers || client.answers.length !== 1) {
      return res.send(false);
    }
    if (client.answers[0] === "안창호") {
      return res.send(true);
    }
    return res.send(false);
  },
};

module.exports = {
  todolist,
  checkbox,
};
