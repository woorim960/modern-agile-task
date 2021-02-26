"use strict";

const name = document.querySelector("#name");
const description = document.querySelector("#description");
const btn = document.querySelector("button");
const table = document.querySelector("table");

function init() {
  drawInit();
  btn.addEventListener("click", create);
  table.addEventListener("click", deleteList);
}

function create() {
  const req = {
    name: name.value,
    description: description.value,
  };

  fetch("/api/todolist", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.text())
    .then((res) => {
      console.log(res);
      if (res) {
        insertInTable(req, res);
      }
    })
    .catch((err) => {
      throw err;
    });
}

function insertInTable(req, index) {
  const tr = document.createElement("tr");
  const td = `
    <td>${req.name}</td>
    <td>${req.description}</td>
    <td><button id="td-button">삭제</button></td>
  `;

  tr.innerHTML = td;
  tr.setAttribute("index", index);
  table.appendChild(tr);
}

function deleteList(e) {
  const parentNode = e.target.parentNode;
  const deleteBtnId = parentNode.childNodes[0].id;
  const tr = parentNode.parentNode;
  const index = tr.getAttribute("index");

  if (deleteBtnId === "td-button") {
    fetch(`/api/todolist/${index}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.text())
      .then((res) => {
        if (res) {
          deleteInTable(tr, res);
        }
      })
      .catch((err) => {
        throw err;
      });
  }
}

function deleteInTable(tr, res) {
  console.log(res);
  if (tr.getAttribute("index") === res) {
    table.removeChild(tr);
  }
}

function drawInit() {
  fetch("/api/todolist", {
    method: "POST",
  })
    .then((res) => res.json())
    .then((res) => {
      if (res) {
        insertInInitTable(res);
      }
    })
    .catch((err) => {
      throw err;
    });
}

function insertInInitTable(posts) {
  for (let i = 0; i < posts.length; i++) {
    const tr = document.createElement("tr");
    const html = `<td>${posts[i].name}</td>
      <td>${posts[i].description}</td>
      <td><button id="td-button">삭제</button></td>`;

    tr.innerHTML = html;
    tr.setAttribute("index", posts[i].id);
    table.appendChild(tr);
  }
}

init();
