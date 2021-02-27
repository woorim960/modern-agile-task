"use strict";

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
      return res.status(201).send(index);
    });
  },

  update: (req, res) => {
    const index = req.params.index;
    const client = req.body;

    const query = "UPDATE todos SET name=?, description=? WHERE id=?;";

    db.query(query, [client.name, client.description, index], (err, result) => {
      if (err) throw err;
      if (result.affectedRows) {
        return res.status(201).send(index);
      }
      return res.status(200).send("수정되지 않았습니다.");
    });
  },

  delete: (req, res) => {
    const index = req.params.index;

    const query = "DELETE FROM todos WHERE id=?;";

    db.query(query, [index], (err, result) => {
      if (err) throw err;
      if (result.affectedRows) {
        return res.status(201).send(index);
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

const login = {
  login: (req, res) => {
    const client = req.body;
    if (client.id !== "test1" || client.password !== "test1") {
      return res.json({ msg: "아이디와 패스워드를 제대로 입력하십시오" });
    }

    const query = "SELECT * FROM users WHERE id=? AND psword=?;";

    db.query(query, [client.id, client.password], (err, users) => {
      if (err) throw err;
      return res.status(201).json({ msg: "success", code: users[0].code });
    });
  },

  check: (req, res) => {
    const code = req.query.code;

    const query = "SELECT * FROM users WHERE code=?;";

    db.query(query, [code], (err, users) => {
      if (err) throw err;
      const user = users[0];
      if (user) {
        const response = {
          msg: "success",
          user: {
            id: user.id,
            password: user.psword,
            name: user.name,
            code: user.code,
          },
        };
        return res.json(response);
      }
      return res.json({ msg: "실패" });
    });
  },
};

module.exports = {
  todolist,
  checkbox,
  login,
};
