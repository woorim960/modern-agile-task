"use strict";

const db = require("../../config/db");
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
    const index = crypto.randomBytes(20).toString("hex"); // token 생성

    const query = "INSERT INTO todos(id, name, description) VALUES (?, ?, ?);";

    db.query(query, [index, client.name, client.description], (err, result) => {
      if (err) throw err;
      return res.send(index);
    });
  },

  delete: (req, res) => {
    const index = req.params.index;

    const query = "DELETE FROM todos WHERE id=?;";

    db.query(query, [index], (err, result) => {
      if (err) throw err;
      return res.send(index);
    });
  },
};

module.exports = {
  todolist,
};
