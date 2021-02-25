"use strict";

const name = document.querySelector("#name");
const description = document.querySelector("#description");
const btn = document.querySelector("button");
const table = document.querySelector("table");

function init() {
  drawInit();
  btn.addEventListener("click", submit);
  table.addEventListener("click", deleteList);
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

function submit() {
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
      if (res) {
        insertInTable(req, res);
        location.redirect = "/todolist";
      }
    })
    .catch((err) => {
      throw err;
    });
}

function insertInTable(req, index) {
  const tr = document.createElement("tr");
  // for (let text of Object.values(req)) {
  //   const td = document.createElement("td");
  //   td.innerHTML = text;
  //   tr.appendChild(td);
  // }
  // const td = document.createElement("td");
  // const button = document.createElement("button");
  // button.innerHTML = "삭제";
  // td.appendChild(button);
  // tr.appendChild(td);

  const html = `<td>${req.name}</td>
  <td>${req.description}</td>
  <td><button id="td-button">삭제</button></td>`;

  tr.innerHTML = html;
  tr.setAttribute("index", index);
  table.appendChild(tr);
}

function deleteList(e) {
  const td = e.target.parentNode;
  const deleteBtnId = td.childNodes[0].id;
  if (deleteBtnId === "td-button") {
    const tr = td.parentNode;
    const index = tr.getAttribute("index");

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

function deleteInTable(tr, index) {
  if (tr.getAttribute("index") === index) {
    table.removeChild(tr);
  }
}

init();
