"use strict";

const named = document.querySelector("#name"),
  description = document.querySelector("#description"),
  button = document.querySelector("button"),
  table = document.querySelector("table");

function run() {
  button.addEventListener("click", insert);
  table.addEventListener("click", clickHandler);
}

const data = {
  name: named.value,
  description: description.value,
};

const post = {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json",
  },
};

const put = {
  method: "PUT",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json",
  },
};

function insert() {
  const request = (post) => {
    fetch("/api/todolist", post)
      .then((res) => res.text())
      .then((res) => result(res));
  };

  const result = (res) => {
    const newRow = table.insertRow();
    newRow.setAttribute("index", res);

    const insertName = newRow.insertCell(0);
    const insertDes = newRow.insertCell(1);
    const updateBtn = newRow.insertCell(2);
    const deleteBtn = newRow.insertCell(3);

    insertName.innerText = `${named.value}`;
    insertDes.innerText = `${description.value}`;
    updateBtn.innerHTML = '<button id="td-update">수정</button>';
    deleteBtn.innerHTML = '<button id="td-delete">삭제</button>';
  };
  request(post);
}

function clickHandler(e) {
  const target = e.target;
  const tr = target.parentNode.parentNode;
  if (target.id === "td-update") return update(tr);
  if (target.id === "td-delete") return del(tr);
}

function update(tr) {
  const index = tr.getAttribute("index");

  const request = (put) => {
    fetch(`/api/todolist/${index}`, put)
      .then((res) => res.text())
      .then((res) => result(tr));
  };

  const result = (tr) => {
    tr.innerHTML = `
        <td>${named.value}</td>
        <td>${description.value}</td>
        <td><button id="td-update">수정</button></td>
        <td><button id="td-delete">삭제</button></td>
      `;
  };

  request(put);
}

function del(tr) {
  const index = tr.getAttribute("index");

  const request = () => {
    fetch(`/api/todolist/${index}`, {
      method: "DELETE",
    })
      .then((res) => res.text())
      .then((res) => result(tr));
  };

  const result = (tr) => {
    tr.innerHTML = ``;
  };

  request();
}

run();
