"use strict";

const name = document.querySelector("#name");
const description = document.querySelector("#description");
const btn = document.querySelector("button");
const table = document.querySelector("table");

function init() {
  drawInit();
  btn.addEventListener("click", create);
  table.addEventListener("click", tableHandler);
}

function create() {
  const req = {
    name: name.value,
    description: description.value,
  };

  fetch("/api/todolist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.text())
    .then((res) => {
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
    <td><button id="td-update">수정</button></td>
    <td><button id="td-delete">삭제</button></td>
  `;

  tr.innerHTML = td;
  tr.setAttribute("index", index);
  table.appendChild(tr);
}

function tableHandler(e) {
  const btnId = e.target.id;
  const tr = e.target.parentNode.parentNode;
  const index = tr.getAttribute("index");

  if (btnId === "td-update") {
    requestUpdate(tr, index);
  } else if (btnId === "td-delete") {
    requestDelete(tr, index);
  }
}

function requestUpdate(tr, index) {
  const req = {
    name: name.value,
    description: description.value,
  };

  fetch(`/api/todolist/${index}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.text())
    .then((res) => {
      if (tr.getAttribute("index") === res) {
        const td = `
          <td>${req.name}</td>
          <td>${req.description}</td>
          <td><button id="td-update">수정</button></td>
          <td><button id="td-delete">삭제</button></td>
        `;

        tr.innerHTML = td;
      }
    })
    .catch((err) => {
      throw err;
    });
}

function requestDelete(tr, index) {
  fetch(`/api/todolist/${index}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then((res) => res.text())
    .then((res) => {
      if (tr.getAttribute("index") === res) {
        table.removeChild(tr);
      }
    })
    .catch((err) => {
      throw err;
    });
}

function drawInit() {
  fetch("/api/todolist")
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
      <td><button id="td-update">수정</button></td>
      <td><button id="td-delete">삭제</button></td>`;

    tr.innerHTML = html;
    tr.setAttribute("index", posts[i].id);
    table.appendChild(tr);
  }
}

init();
